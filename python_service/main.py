from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn
import random

app = FastAPI(title="Resume Analysis Service")

class ParseRequest(BaseModel):
    text: str

class AnalysisResult(BaseModel):
    score: int
    strengths: list[str]
    weaknesses: list[str]
    suggestions: list[str]

@app.post("/analyze", response_model=AnalysisResult)
async def analyze_resume(request: ParseRequest):
    if not request.text or not request.text.strip():
        raise HTTPException(status_code=400, detail="Empty text provided")

    # Mock implementation of LLM analysis
    # In a real scenario, we'd send the text to OpenAI/Gemini
    text = request.text.lower()
    
    strengths = []
    if "python" in text or "javascript" in text or "java" in text:
        strengths.append("Strong programming language keywords found.")
    if "docker" in text or "aws" in text or "cloud" in text:
        strengths.append("Experience with modern cloud/devops tools.")
    if "leadership" in text or "manager" in text:
        strengths.append("Demonstrates leadership potential.")
        
    if not strengths:
        strengths.append("Clear formatting and structure.")

    weaknesses = []
    suggestions = []
    
    if len(text) < 500:
        weaknesses.append("Resume is too short, lacking detail.")
        suggestions.append("Add more descriptive bullet points to your experiences.")
    if "impact" not in text and "achieved" not in text:
        weaknesses.append("Lack of quantifiable achievements.")
        suggestions.append("Use numbers and metrics to highlight the impact of your work.")
    
    # Generic suggestions if needed
    if len(suggestions) < 3:
        suggestions.append("Consider customizing your objective statement for the specific role.")
        if len(suggestions) < 3:
            suggestions.append("Ensure your formatting is consistent throughout.")
            
    score = random.randint(70, 95)
    
    return AnalysisResult(
        score=score,
        strengths=strengths[:3],
        weaknesses=weaknesses[:3],
        suggestions=suggestions[:3]
    )

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
