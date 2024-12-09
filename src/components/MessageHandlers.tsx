import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ContentType, MessageContent } from '../types';

// Spinner Component
const Spinner: React.FC = () => (
  <div className="animate-spin h-4 w-4 border-2 border-blue-600 rounded-full border-t-transparent" />
);

// Text Message Handler
export const TextHandler: React.FC<{ content: string }> = ({ content }) => (
  <div className="prose prose-sm max-w-none dark:prose-invert">
    <ReactMarkdown
      components={{
        p: ({ children }) => <p className="m-0">{children}</p>,
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
            {children}
          </a>
        ),
        ul: ({ children }) => <ul className="list-disc pl-4 my-2">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal pl-4 my-2">{children}</ol>,
        li: ({ children }) => <li className="my-1">{children}</li>,
        code: ({ children }) => <code className="bg-gray-100 px-1 rounded">{children}</code>,
        pre: ({ children }) => <pre className="bg-gray-100 p-2 rounded my-2 overflow-x-auto">{children}</pre>,
      }}
    >
      {content}
    </ReactMarkdown>
  </div>
);

// Code Block Handler
export const CodeBlockHandler: React.FC<{
  code: string;
  language: string;
  filename?: string;
}> = ({ code, language, filename }) => (
  <div className="bg-gray-900 text-gray-100 rounded-md overflow-hidden">
    {filename && (
      <div className="bg-gray-800 px-4 py-2 text-sm border-b border-gray-700">
        {filename}
      </div>
    )}
    <pre className="p-4 overflow-x-auto">
      <code className={`language-${language}`}>{code}</code>
    </pre>
  </div>
);

// Terminal Step Component
const TerminalStep: React.FC<{
  command: string;
  output?: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  onRun?: () => void;
  isActive: boolean;
  isVisible: boolean;
}> = ({ command, output, status, onRun, isActive, isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <div className={`space-y-2 ${!isActive && 'opacity-60'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-gray-400">$</span>
          <span className={`font-mono ${isActive ? 'text-gray-100' : 'text-gray-400'}`}>{command}</span>
        </div>
        {status !== 'completed' && isActive && (
          <button
            onClick={onRun}
            disabled={status === 'running'}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-500"
          >
            {status === 'running' ? 'Running...' : 'Run'}
          </button>
        )}
      </div>
      {output && (
        <div className="pl-4 text-gray-300 whitespace-pre-wrap font-mono text-sm border-l border-gray-700">
          {output}
        </div>
      )}
    </div>
  );
};

// Terminal Handler
export const TerminalHandler: React.FC<{
  steps: Array<{
    command: string;
    output?: string;
    status: 'pending' | 'running' | 'completed' | 'error';
  }>;
  current_step: number;
  status: 'pending' | 'running' | 'completed' | 'error';
  onRun?: (command: string) => void;
}> = ({ steps, current_step, status, onRun }) => (
  <div className="bg-gray-900 text-gray-100 rounded-md p-4 font-mono text-sm">
    <div className="space-y-4">
      {steps.map((step, index) => (
        <TerminalStep
          key={index}
          command={step.command}
          output={step.output}
          status={step.status}
          onRun={() => onRun?.(step.command)}
          isActive={index === current_step}
          isVisible={index <= current_step}
        />
      ))}
    </div>
    {status === 'running' && current_step < steps.length && (
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <div className="animate-pulse h-2 w-2 bg-green-500 rounded-full" />
          <span>Terminal active...</span>
          <span className="ml-auto">{current_step + 1}/{steps.length}</span>
        </div>
      </div>
    )}
  </div>
);

// Image Handler
export const ImageHandler: React.FC<{
  capture: {
    imageUrl: string;
    dimensions: { width: number; height: number };
  };
}> = ({ capture }) => (
  <div className="rounded-md overflow-hidden border border-gray-200">
    <div className="bg-gray-50 px-3 py-2 text-sm text-gray-500 border-b">
      Screen Capture ({capture.dimensions.width}×{capture.dimensions.height})
    </div>
    <img 
      src={capture.imageUrl} 
      alt="Screen capture" 
      className="w-full h-auto"
      style={{ maxHeight: '400px', objectFit: 'contain' }} 
    />
  </div>
);

// Status Badge Component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};

// Data Log Handler (for both user and vendor data)
export const DataLogHandler: React.FC<{
  data: Record<string, any>;
  source: string;
  timestamp: number;
}> = ({ data, source, timestamp }) => {
  const formatValue = (value: any): string => {
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    if (typeof value === 'string') {
      return value;
    }
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    if (value === null || value === undefined) {
      return '-';
    }
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return JSON.stringify(value);
  };

  const formatKey = (key: string): string => {
    return key
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const renderLogEntries = (logs: { entries: any[], summary: any }) => {
    return (
      <div className="space-y-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">ID</th>
                <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">Trace ID</th>
                <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">Status</th>
                <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">Message</th>
                <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">Timestamp</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.entries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-600">{entry.id}</td>
                  <td className="px-4 py-2 text-sm font-medium text-gray-900">{entry.trace_id}</td>
                  <td className="px-4 py-2 text-sm">
                    <StatusBadge status={entry.status} />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">{entry.message}</td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {new Date(entry.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-gray-50 rounded-md p-3 grid grid-cols-5 gap-4">
          {Object.entries(logs.summary).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-xs text-gray-500 uppercase">{formatKey(key)}</div>
              <div className="text-sm font-medium text-gray-900">{formatValue(value)}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white border rounded-md overflow-hidden">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-50 border-b">
        <span className="font-medium text-gray-700">{source}</span>
        <span className="text-sm text-gray-500">
          {new Date(timestamp).toLocaleString()}
        </span>
      </div>
      <div className="p-2">
        {data.logs ? (
          renderLogEntries(data.logs)
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="divide-y divide-gray-200">
              {Object.entries(data).map(([key, value]) => (
                <tr key={key} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm font-medium text-gray-600 whitespace-nowrap">
                    {formatKey(key)}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {typeof value === 'object' && value !== null ? (
                      <div className="space-y-1">
                        {Object.entries(value).map(([subKey, subValue]) => (
                          <div key={subKey} className="flex justify-between">
                            <span className="text-gray-600">{formatKey(subKey)}:</span>
                            <span className="font-medium">{formatValue(subValue)}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="font-medium">{formatValue(value)}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// Spinner Message Handler
export const SpinnerHandler: React.FC<{
  text: string;
}> = ({ text }) => (
  <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-3">
    <Spinner />
    <span>{text}</span>
  </div>
);

// Main Message Content Handler
export const MessageContentHandler: React.FC<{
  content: MessageContent;
  onRunCommand?: (command: string) => void;
}> = ({ content, onRunCommand }) => {
  switch (content.type) {
    case ContentType.Text:
      return <TextHandler content={content.text} />;

    case ContentType.CodeBlock:
      return (
        <CodeBlockHandler
          code={content.code}
          language={content.language}
          filename={content.filename}
        />
      );

    case ContentType.Terminal:
      return (
        <TerminalHandler
          steps={content.steps}
          current_step={content.current_step}
          status={content.status}
          onRun={onRunCommand}
        />
      );

    case ContentType.Image:
      return content.capture ? <ImageHandler capture={content.capture} /> : null;

    case ContentType.UserData:
      return (
        <DataLogHandler
          data={content.data}
          source={content.source}
          timestamp={content.timestamp}
        />
      );

    case ContentType.VendorData:
      return (
        <DataLogHandler
          data={content.data}
          source={content.vendor}
          timestamp={content.timestamp}
        />
      );

    case ContentType.Spinner:
      return <SpinnerHandler text={content.text} />;

    default:
      return null;
  }
}; 