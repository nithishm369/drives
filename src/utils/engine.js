export class DriveLogicEngine {
    // Logic for recommending cable cross-sections based on current and length
    static suggestCable(Input_CurrentAmps, lengthMeters) {
        const cables = [
            { maxA: 10, size: "1.5" },
            { maxA: 20, size: "2.5" },
            { maxA: 30, size: "4" },
            { maxA: 40, size: "6" },
            { maxA: 60, size: "10" },
            { maxA: 80, size: "16" },
            { maxA: 100, size: "25" },
            { maxA: 130, size: "35" },
            { maxA: 160, size: "50" },
            { maxA: 200, size: "70" },
            { maxA: 250, size: "95" },
            { maxA: 300, size: "120" },
            { maxA: 350, size: "150" },
            { maxA: 400, size: "185" },
            { maxA: 500, size: "240" },
            { maxA: 600, size: "2x150" },
            { maxA: 700, size: "2x185" },
            { maxA: 800, size: "2x240" },
            { maxA: 1000, size: "3x185" },
            { maxA: 1200, size: "3x240" },
            { maxA: 1500, size: "4x240" },
            { maxA: 2000, size: "5x240" },
            { maxA: 2500, size: "6x240" },
            { maxA: 3500, size: "8x240" },
            { maxA: 6000, size: "Busbar" }
        ];

        let baseIndex = cables.findIndex(c => c.maxA >= Input_CurrentAmps);
        if (baseIndex === -1) baseIndex = cables.length - 1;

        let warning = null;
        let requiredFilter = "None";
        let finalIndex = baseIndex;

        if (lengthMeters >= 300) {
            finalIndex = Math.min(baseIndex + 2, cables.length - 1);
            warning = "Extreme cable length >= 300m. Cable upsized by TWO steps.";
            requiredFilter = "Sine Wave Filter Mandatory";
        } else if (lengthMeters > 100) {
            finalIndex = Math.min(baseIndex + 1, cables.length - 1);
            warning = "Long cable > 100m. Cable upsized by ONE step.";
            requiredFilter = "du/dt Filter Recommended";
        }

        return {
            crossSection: cables[finalIndex].size,
            warning,
            requiredFilter
        };
    }

    // Logic for calculating required airflow in cubic meters per hour
    static calculateAirflow(heatdissipationW, type) {
        if (type && type.includes('Liquid Cooled')) {
            // For LC, airflow is minimal (only for cabinet losses to air)
            return Math.ceil((heatdissipationW / 5) * 3.1);
        }
        const m3h = (heatdissipationW / 10) * 3.1;
        return Math.ceil(m3h);
    }

    // Static harmonic profile data based on drive technology
    static analyzeHarmonics(driveType, Input_CurrentLoad) {
        if (driveType.includes('Active Front End')) {
            return [
                { name: 'Fund', val: 100 },
                { name: '5th', val: 1.5 },
                { name: '7th', val: 1.0 },
                { name: '11th', val: 0.5 },
                { name: '13th', val: 0.4 },
                { name: 'THDi', val: 3.2 }
            ];
        } else if (driveType === 'DC Bus Supply') {
            return [
                { name: 'Fund', val: 100 },
                { name: '5th', val: 'N/A' },
                { name: '7th', val: 'N/A' },
                { name: '11th', val: 'N/A' },
                { name: '13th', val: 'N/A' },
                { name: 'THDi', val: 'N/A' }
            ];
        } else {
            return [
                { name: 'Fund', val: 100 },
                { name: '5th', val: 35 },
                { name: '7th', val: 12 },
                { name: '11th', val: 6 },
                { name: '13th', val: 4 },
                { name: 'THDi', val: 35.0 }
            ];
        }
    }

    // Primary search logic to filter the database for the best technical match
    static findBestMatch(inputs, database) {
        const { voltage, powerKw, family, cableLength } = inputs;
        const isHighPower = powerKw > 250;
        const forceMultidrive = family === 'Multidrive';
        const allowMultidrive = family === 'All' || family === 'Multidrive';
        let results = [];

        // 1. Multidrive Logic
        if (forceMultidrive || (isHighPower && allowMultidrive)) {
            const inverterCandidates = database.filter(d =>
                d.family === 'ACS880-107' &&
                Math.abs(d.voltage - voltage) <= 50
            );

            inverterCandidates.sort((a, b) => a.power_kw - b.power_kw);
            let inverter = inverterCandidates.find(d => d.power_kw >= powerKw);

            if (inverter) {
                const dsuCandidates = database.filter(d =>
                    (d.family === 'ACS880-304' || d.family === 'ACS880-307' || d.family === 'ACS880-207') &&
                    Math.abs(d.voltage - voltage) <= 50
                );

                dsuCandidates.sort((a, b) => a.Input_Current_a - b.Input_Current_a);
                let dsu = dsuCandidates.find(d => d.Input_Current_a >= inverter.Input_Current_a);
                if (!dsu) dsu = dsuCandidates[dsuCandidates.length - 1];

                if (dsu) {
                    results.push({
                        id: `${inverter.id} + ${dsu.id}`,
                        family: 'ACS880 Multidrive',
                        voltage: voltage,
                        power_kw: inverter.power_kw,
                        Input_Current_a: inverter.Input_Current_a,
                        frame: `${inverter.frame} + ${dsu.frame}`,
                        type: `Inverter + ${dsu.type}`,
                        harmonics_type: dsu.harmonics_type,
                        ip_class: 'IP22/IP55',
                        heat_dissipation_w: inverter.heat_dissipation_w + dsu.heat_dissipation_w,
                        noise_dba: Math.max(inverter.noise_dba, dsu.noise_dba),
                        inverter: inverter,
                        dsu: dsu
                    });
                }
            }
        }

        // 2. Standard Drive Logic
        let candidates = database.filter(d => Math.abs(d.voltage - voltage) <= (voltage >= 600 ? 100 : 50));

        if (family && family !== 'All') {
            candidates = candidates.filter(d => d.family === family);
        } else {
            if (!isHighPower) {
                candidates = candidates.filter(d => !d.family.includes('107') && !d.family.includes('304') && !d.family.includes('307') && !d.family.includes('207'));
            } else if (forceMultidrive) {
                candidates = [];
            }
        }

        candidates.sort((a, b) => a.power_kw - b.power_kw);
        let matchIndex = candidates.findIndex(d => d.power_kw >= powerKw);

        if (matchIndex !== -1) {
            results = [...results, ...candidates.slice(matchIndex, matchIndex + 5)];
        }
        
        return results;
    }
}
