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
    <div className="mb-8 bg-white/[0.02] p-6 rounded-2xl border border-white/5 shadow-sm">
      <div className="mb-4">
        <label className="block text-lg font-semibold text-white mb-1">
          {question.title}
        </label>
        {question.description && (
          <p className="text-sm text-white/60">{question.description}</p>
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

      {error && <p className="mt-2 text-sm text-red-400 flex items-center gap-1"><HelpCircle className="w-4 h-4" /> {error}</p>}
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
      <div className="flex justify-between text-xs text-white/50 mb-2 px-1">
        <span>{q.minLabel}</span>
        <span>{q.maxLabel}</span>
      </div>
      <div className="flex gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`flex-1 py-3 rounded-xl border text-lg font-medium transition-all ${
              value === opt
                ? 'bg-neon-cyan/20 border-neon-cyan text-neon-cyan shadow-[0_0_15px_rgba(62,231,255,0.3)]'
                : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30 hover:bg-white/10'
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
              className={`text-sm underline transition-colors ${value === 'nao_sei' ? 'text-neon-cyan font-semibold' : 'text-white/40 hover:text-white/60'}`}
            >
              Não sei informar
            </button>
          )}
          {q.allowNotApplicable && (
            <button
              type="button"
              onClick={() => onChange('N/A')}
              className={`text-sm underline transition-colors ${value === 'N/A' ? 'text-neon-cyan font-semibold' : 'text-white/40 hover:text-white/60'}`}
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
          className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
            value === opt.value
              ? 'border-neon-cyan bg-neon-cyan/10 shadow-[0_0_15px_rgba(62,231,255,0.15)]'
              : 'border-white/10 bg-white/5 hover:bg-white/10'
          }`}
        >
          <input
            type="radio"
            name={q.id}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="w-4 h-4 text-neon-cyan border-white/20 bg-transparent focus:ring-neon-cyan focus:ring-offset-ink-950"
          />
          <span className={`ml-3 block font-medium ${value === opt.value ? 'text-neon-cyan' : 'text-white/70'}`}>
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  );
}

function TextInput({ q, value, onChange }: { q: TextQuestion; value: any; onChange: (v: any) => void }) {
  const baseClasses = "w-full rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 shadow-sm focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none transition-all p-4";
  
  if (q.type === 'textarea') {
    return (
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={q.placeholder}
        className={`${baseClasses} min-h-[120px] resize-y`}
      />
    );
  }

  return (
    <input
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={q.placeholder}
      className={baseClasses}
    />
  );
}

function NumberInput({ q, value, onChange }: { q: NumberQuestion; value: any; onChange: (v: any) => void }) {
  const baseClasses = "w-full rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 shadow-sm focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none transition-all p-4";

  return (
    <div className="relative">
      {q.type === 'currency' && (
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span className="text-white/50 font-medium">R$</span>
        </div>
      )}
      <input
        type="number"
        value={value || ''}
        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
        placeholder={q.placeholder}
        min="0"
        className={`${baseClasses} ${q.type === 'currency' ? 'pl-12' : ''} ${q.type === 'percentage' ? 'pr-12' : ''}`}
      />
      {q.type === 'percentage' && (
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <span className="text-white/50 font-medium">%</span>
        </div>
      )}
    </div>
  );
}
