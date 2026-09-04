import { useCallback } from 'react';
import VisualLabShell from '../../components/lab/VisualLabShell';
import { pythonExamples } from '../../data/labExamples';
import { runPythonWithTrace } from '../../services/pyodideRunner';

export default function PythonLab() {
  const onRunTrace = useCallback((code) => runPythonWithTrace(code), []);

  return (
    <VisualLabShell
      language="python"
      badge="Code Lab · Python first"
      title="Python Visual Dry-Run Lab"
      subtitle="Write Python in the browser, then step through it like a dry run on paper. Watch variables appear and change in memory — built for total beginners at ComputerGeek Academy."
      tip="Tip: Click Trace program once (first load downloads a tiny Python engine ~few seconds). Then press Step to walk line by line. Nothing to install."
      examples={pythonExamples}
      defaultCode={pythonExamples[0].code}
      onRunTrace={onRunTrace}
    />
  );
}
