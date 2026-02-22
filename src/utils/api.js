export async function callGemini(apiKey, prompt, systemPrompt = "You are an expert ABB Drives application engineer.") {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] }
    };

    const delays = [1000, 2000, 4000, 8000, 16000];
    for (let i = 0; i < delays.length; i++) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                if (response.status === 429) throw new Error("Too Many Requests");
                const errText = await response.text();
                throw new Error(`API Error: ${response.status} - ${errText}`);
            }
            const data = await response.json();
            return data.candidates?.[0]?.content?.parts?.[0]?.text || "No analysis available.";
        } catch (error) {
            if (i === delays.length - 1) return `Error: ${error.message}. Please try again later.`;
            await new Promise(resolve => setTimeout(resolve, delays[i]));
        }
    }
}
