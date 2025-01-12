"use client";

import React, { useState, useEffect } from 'react';
import { Search, Download, ChevronRight, Code, User, Sun, Moon, Terminal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

const StepLibrary = () => {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  const [steps, setSteps] = useState<any[]>([]);

  useEffect(() => {
    setSteps([
      {
        step_id: "123-123-123-123",
        step_name: "Data Preprocessing",
        step_inputs: ".csv file",
        step_outputs: ".csv file",
        step_code: "some \n code \n blah blah blah blah",
        step_framework: "Prefect",
        step_downloads: 1234,
        step_creator: "abhiram"
      },
      {
        step_id: "567-567-567-567",
        step_name: "Feature Extraction",
        step_inputs: "array",
        step_outputs: "array",
        step_code: "some \n code \n blah blah blah blah",
        step_framework: "Prefect",
        step_downloads: 1234,
        step_creator: "venkat"
      }
    ]);
  }, []);

  const handleUseElement = (stepId: string) => {
    const command = `lychee use_step ${stepId}`;
    navigator.clipboard.writeText(command);
    alert('Command copied, paste in CLI');
  };

  const filteredSteps = steps.filter(step => 
    step.step_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    step.step_framework.toLowerCase().includes(searchTerm.toLowerCase()) ||
    step.step_inputs.toLowerCase().includes(searchTerm.toLowerCase()) ||
    step.step_outputs.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isClient) {
    return null;
  }

  return (
    <div className={`min-h-screen ${
      isDarkMode 
        ? 'bg-[#1a1a1a] text-gray-100' 
        : 'bg-gray-50 text-gray-900'
    } transition-colors duration-200`}>
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-medium">Step Library</h1>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className={`absolute left-3 top-2.5 h-4 w-4 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <Input
                placeholder="Search steps..."
                className={`pl-10 text-sm ${
                  isDarkMode 
                    ? 'bg-[#2a2a2a] border-0 text-gray-200 placeholder:text-gray-500 focus:ring-1 focus:ring-gray-500' 
                    : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-gray-300'
                }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              <Switch
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
                className="data-[state=checked]:bg-gray-700"
              />
              <Moon className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {filteredSteps.map(step => (
            <div
              key={step.step_id}
              className={`rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-[#2a2a2a] hover:bg-[#333333]' 
                  : 'bg-white hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <div 
                className="p-4 cursor-pointer"
                onClick={() => setExpandedStep(expandedStep === step.step_id ? null : step.step_id)}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-sm font-medium">{step.step_name}</h3>
                      <Badge variant={isDarkMode ? "secondary" : "outline"} 
                        className={isDarkMode ? "bg-[#3a3a3a]" : ""}>
                        {step.step_framework}
                      </Badge>
                    </div>
                    <div className={`flex gap-4 mt-1 text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <span>{step.step_inputs} → {step.step_outputs}</span>
                    </div>
                  </div>
                  <div className={`flex items-center gap-6 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <div className="flex items-center gap-2 text-xs">
                      <Download className="h-3 w-3" />
                      <span>{step.step_downloads}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <User className="h-3 w-3" />
                      <span className="font-mono">
                        {expandedStep === step.step_id ? step.step_creator : `${step.step_creator.slice(0, 8)}...`}
                      </span>
                    </div>
                    <ChevronRight 
                      className={`h-4 w-4 transition-transform ${
                        expandedStep === step.step_id ? 'rotate-90' : ''
                      }`}
                    />
                  </div>
                </div>
              </div>

              {expandedStep === step.step_id && (
                <div className={`px-4 pb-4 mt-2 pt-4 border-t ${
                  isDarkMode ? 'border-[#3a3a3a]' : 'border-gray-200'
                }`}>
                  <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                    <div>
                      <h4 className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                        Input Type
                      </h4>
                      <p>{step.step_inputs}</p>
                    </div>
                    <div>
                      <h4 className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                        Output Type
                      </h4>
                      <p>{step.step_outputs}</p>
                    </div>
                    <div>
                      <h4 className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                        Framework
                      </h4>
                      <p>{step.step_framework}</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Code className={`h-4 w-4 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                        <h4 className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                          Implementation
                        </h4>
                      </div>
                      <Button
                        size="sm"
                        variant={isDarkMode ? 'secondary' : 'outline'}
                        className={`gap-2 ${
                            isDarkMode 
                            ? 'bg-[#3a3a3a] text-gray-100 border-gray-600 hover:bg-[#4a4a4a]'
                            : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-100'
                        }`}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleUseElement(step.step_id);
                        }}
                      >
                        <Terminal className="h-4 w-4" />
                        Use Element
                      </Button>
                    </div>
                    <pre className={`p-3 rounded-md text-sm overflow-x-auto font-mono ${
                      isDarkMode ? 'bg-[#1a1a1a]' : 'bg-gray-50'
                    }`}>
                      <code>{step.step_code}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepLibrary;
