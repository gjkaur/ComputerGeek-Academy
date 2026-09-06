import { useCallback } from 'react';
import VisualLabShell from '../../components/lab/VisualLabShell';
import { pythonExamples } from '../../data/labExamples';
import { runPythonWithTrace } from '../../services/pyodideRunner';

export default function PythonLab() {
  const onRunTrace = useCallback((code) => runPythonWithTrace(code), []);

  return (
    <VisualLabShell
      language="python"
      badge="Bootcamp lab"
      title="Python Visual Dry-Run Lab"
      subtitle="Pick a module from the left index, then Trace and Step — controls stay on screen."
      tip="Index follows slides_outline.md: Week → Module → Slide. Click a slide to load its drill. Hide the panel for a wider workspace (Esc)."
      examples={pythonExamples}
      defaultCode={pythonExamples[0].code}
      onRunTrace={onRunTrace}
    />
  );
}
