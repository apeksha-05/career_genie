import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2, AlertTriangle, XCircle, Loader2, Download, RefreshCw } from 'lucide-react';
import { useSelector } from 'react-redux';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);
  const token = useSelector((state) => state.auth.token);
  const API_BASE = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace('/auth', '')
    : 'http://localhost:5000/api/v1';

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleFileSelect = (selectedFile) => {
    setError(null);
    if (selectedFile.type !== 'application/pdf') {
      setError('Please upload a valid PDF file.');
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit.');
      return;
    }
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setProgress(0);
    setError(null);
    
    const formData = new FormData();
    formData.append('resume', file);
    
    try {
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);

      const response = await fetch(`${API_BASE}/resumes/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });
      
      clearInterval(progressInterval);
      setProgress(100);
      
      const data = await response.json();
      
      if (response.ok) {
        setResult(data.data.analysisResult);
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch (err) {
      setError('An error occurred while uploading. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <main className="flex-grow pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Intelligence Analysis</h1>
            <p className="text-gray-600">Upload your resume to receive AI-powered feedback and ATS compatibility scores.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column - Upload Area */}
            <div className="lg:col-span-4">
              <div 
                className={`bg-white border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center text-center h-[400px] transition-all ${
                  isDragging ? 'border-brand-500 bg-blue-50' : 'border-gray-300 hover:border-brand-400'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileInput}
                  accept="application/pdf"
                  className="hidden"
                />

                {uploading ? (
                  <div className="flex flex-col items-center">
                    <Loader2 className="h-12 w-12 text-brand-900 animate-spin mb-4" />
                    <p className="text-gray-900 font-semibold mb-2">Analyzing Resume...</p>
                    <div className="w-48 bg-gray-200 rounded-full h-2 mb-2">
                      <div className="bg-brand-900 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                      <UploadCloud className="h-10 w-10 text-brand-900" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Drag & drop your resume here</h3>
                    <p className="text-sm text-gray-500 mb-8">PDF or DOCX up to 5MB</p>
                    
                    {file && <p className="text-sm font-medium text-brand-900 mb-4 truncate w-full px-4">{file.name}</p>}

                    {!file ? (
                      <Button 
                        onClick={() => fileInputRef.current?.click()}
                        variant="solid"
                        className="px-8 shadow-md"
                      >
                        Browse Files
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleUpload}
                        variant="solid"
                        fullWidth
                        className="!bg-green-600 hover:!bg-green-700 shadow-md"
                      >
                        Analyze Resume
                      </Button>
                    )}
                  </>
                )}
                {error && <p className="mt-4 text-sm text-red-500 font-medium">{error}</p>}
              </div>
            </div>

            {/* Right Column - Results */}
            <div className="lg:col-span-8">
              <Card className="p-8 h-full flex flex-col">
                
                {!result ? (
                  <div className="flex-grow flex flex-col items-center justify-center text-gray-400">
                    <svg className="w-24 h-24 mb-4 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-lg">Upload your resume to see the analysis results here.</p>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col md:flex-row items-center md:items-start mb-10 pb-8 border-b border-gray-100">
                      {/* Score Circle */}
                      <div className="relative w-32 h-32 flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="64" cy="64" r="56" fill="none" stroke="#f3f4f6" strokeWidth="12" />
                          <circle 
                            cx="64" 
                            cy="64" 
                            r="56" 
                            fill="none" 
                            stroke="var(--color-brand-900)" 
                            strokeWidth="12" 
                            strokeDasharray="351.8" 
                            strokeDashoffset={351.8 - (351.8 * result.score) / 100} 
                            className="transition-all duration-1000 ease-out"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-4xl font-extrabold text-gray-900">{result.score}</span>
                          <span className="text-xs font-bold text-gray-500 tracking-wider">SCORE</span>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Impressive Work!</h2>
                        <p className="text-gray-600 leading-relaxed">
                          Your resume is highly optimized for technical roles. A few minor adjustments could boost your score to the top 5% of candidates.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                      {/* Strengths */}
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 flex items-center mb-4">
                          <CheckCircle2 className="text-green-500 mr-2 h-6 w-6" /> Key Strengths
                        </h3>
                        <div className="space-y-4">
                          {(result?.strengths || []).slice(0, 2).map((strength, idx) => (
                            <div key={idx} className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-start">
                              <CheckCircle2 className="text-green-500 mt-0.5 mr-3 h-5 w-5 shrink-0" />
                              <p className="text-sm text-gray-700">{strength}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Areas to Improve */}
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 flex items-center mb-4">
                          <AlertTriangle className="text-yellow-500 mr-2 h-6 w-6" /> Areas to Improve
                        </h3>
                        <div className="space-y-4">
                          {(result?.weaknesses || []).slice(0, 1).map((weakness, idx) => (
                            <div key={idx} className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-start">
                              <AlertTriangle className="text-orange-500 mt-0.5 mr-3 h-5 w-5 shrink-0" />
                              <p className="text-sm text-gray-700">{weakness}</p>
                            </div>
                          ))}
                          {(result?.suggestions || []).slice(0, 1).map((suggestion, idx) => (
                            <div key={idx} className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start">
                              <XCircle className="text-red-500 mt-0.5 mr-3 h-5 w-5 shrink-0" />
                              <p className="text-sm text-gray-700">{suggestion}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-auto pt-8 border-t border-gray-100">
                      <Button variant="solid" fullWidth className="py-3">
                        <Download className="mr-2 h-5 w-5" /> Download Feedback Report
                      </Button>
                      <Button 
                        variant="outline"
                        fullWidth
                        className="py-3"
                        onClick={() => { setFile(null); setResult(null); }}
                      >
                        <RefreshCw className="mr-2 h-5 w-5" /> Re-upload Resume
                      </Button>
                    </div>
                  </>
                )}

              </Card>
            </div>
          </div>
          
          {/* Bottom Section - Strategies */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Expert Resume Strategies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="rounded-2xl overflow-hidden relative group cursor-pointer h-64">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="ATS Scan" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block px-3 py-1 bg-brand-900 text-white text-xs font-bold rounded mb-3">Best Practice</span>
                  <h3 className="text-xl font-bold text-white">Mastering the ATS Scan</h3>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden relative group cursor-pointer h-64">
                <img src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80" alt="Quantifying" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block px-3 py-1 bg-teal-600 text-white text-xs font-bold rounded mb-3">Pro Tip</span>
                  <h3 className="text-xl font-bold text-white">Quantifying Your Achievements</h3>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden relative group cursor-pointer h-64">
                <img src="https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&w=800&q=80" alt="LinkedIn" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded mb-3">New</span>
                  <h3 className="text-xl font-bold text-white">LinkedIn Profile Synergy</h3>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ResumeUpload;
