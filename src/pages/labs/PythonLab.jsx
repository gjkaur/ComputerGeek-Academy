import { useCallback } from 'react';
import VisualLabShell from '../../components/lab/VisualLabShell';
import { pythonExamples } from '../../data/labExamples';
import { runPythonWithTrace } from '../../services/pyodideRunner';

export default function PythonLab() {
  const onRunTrace = useCallback((code) => runPythonWithTrace(code), []);

  return (
    <VisualLabShell
      language="python"
      badge="Code Lab · Bootcamp-aligned"
      title="Python Visual Dry-Run Lab"
      subtitle="Practice samples mapped to all 8 weeks of the Python Software Engineer Bootcamp — from variables and OOP through simulated APIs, queues, caching, and production checks. Step through memory like a dry run on paper."
      tip="Tip: Filter by Week 1–8, pick a module sample, then click Trace program (first load downloads a tiny Python engine). Later weeks use in-browser simulations of FastAPI/DB/Docker concepts — no install required."
      examples={pythonExamples}
      defaultCode={pythonExamples[0].code}
      onRunTrace={onRunTrace}
    />
  );
}
