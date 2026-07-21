import React from 'react';
import { AnyQuestion, ScaleQuestion, SelectQuestion, TextQuestion, NumberQuestion } from '../../../types/diagnostic';
import { HelpCircle } from 'lucide-react';

interface QuestionRendererProps {
  question: AnyQuestion;
  value: any;
  onChange: (val: any) => void;
  error?: string;
}

export function QuestionRenderer({ question, value, onChange, error }: QuestionRendererProps) {
  return (
    <div className="mb-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="mb-4">
        <label className="block text-lg font-semibold text-slate-800 mb-1">
          {question.title}
        </label>
        {question.description && (
          <p className="text-sm text-slate-500">{question.description}</p>
        )}
      </div>

      <div className="mt-4">
        {question.type === 'scale' && (
          <ScaleInput q={question as ScaleQuestion} value={value} onChange={onChange} />
        )}
        {question.type === 'select' && (
          <SelectInput q={question as SelectQuestion} value={value} onChange={onChange} />
        )}
        {(question.type === 'text' || question.type === 'textarea') && (
          <TextInput q={question as TextQuestion} value={value} onChange={onChange} />
        )}
        {(question.type === 'number' || question.type === 'currency' || question.type === 'percentage') && (
          <NumberInput q={question as NumberQuestion} value={value} onChange={onChange} />
        )}
      </div>

      {error && <p className="mt-2 text-sm text-red-600 flex items-center gap-1"><HelpCircle className="w-4 h-4" /> {error}</p>}
    </div>
  );
}

function ScaleInput({ q, value, onChange }: { q: ScaleQuestion; value: any; onChange: (v: any) => void }) {
  const options = [];
  for (let i = q.min; i <= q.max; i++) {
    options.push(i);
  }

  return (
    <div>
      <div className="flex justify-between text-xs text-slate-500 mb-2 px-1">
        <span>{q.minLabel}</span>
        <span>{q.maxLabel}</span>
      </div>
      <div className="flex gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`flex-1 py-3 rounded-lg border text-lg font-medium transition-colors ${
              value === opt
                ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {(q.allowDontKnow || q.allowNotApplicable) && (
        <div className="mt-3 flex gap-4 justify-end">
          {q.allowDontKnow && (
            <button
              type="button"
              onClick={() => onChange('nao_sei')}
              className={`text-sm underline ${value === 'nao_sei' ? 'text-blue-600 font-semibold' : 'text-slate-400'}`}
            >
              Não sei informar
            </button>
          )}
          {q.allowNotApplicable && (
            <button
              type="button"
              onClick={() => onChange('N/A')}
              className={`text-sm underline ${value === 'N/A' ? 'text-blue-600 font-semibold' : 'text-slate-400'}`}
            >
              Não se aplica
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function SelectInput({ q, value, onChange }: { q: SelectQuestion; value: any; onChange: (v: any) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {q.options.map((opt) => (
        <label
          key={opt.value}
          className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${
            value === opt.value
              ? 'border-blue-600 bg-blue-50/50 shadow-sm'
              : 'border-slate-200 bg-white hover:bg-slate-50'
          }`}
        >
          <input
            type="radio"
            name={q.id}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-600"
          />
          <span className={`ml-3 block font-medium ${value === opt.value ? 'text-blue-900' : 'text-slate-700'}`}>
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  );
}

function TextInput({ q, value, onChange }: { q: TextQuestion; value: any; onChange: (v: any) => void }) {
  if (q.type === 'textarea') {
    return (
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={q.placeholder}
        className="w-full rounded-xl border-slate-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4 min-h-[120px]"
      />
    );
  }

  return (
    <input
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={q.placeholder}
      className="w-full rounded-xl border-slate-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4"
    />
  );
}

function NumberInput({ q, value, onChange }: { q: NumberQuestion; value: any; onChange: (v: any) => void }) {
  return (
    <div className="relative">
      {q.type === 'currency' && (
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span className="text-slate-500 font-medium">R$</span>
        </div>
      )}
      <input
        type="number"
        value={value || ''}
        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
        placeholder={q.placeholder}
        min="0"
        className={`w-full rounded-xl border-slate-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4 ${
          q.type === 'currency' ? 'pl-12' : ''
        } ${q.type === 'percentage' ? 'pr-12' : ''}`}
      />
      {q.type === 'percentage' && (
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <span className="text-slate-500 font-medium">%</span>
        </div>
      )}
    </div>
  );
}
