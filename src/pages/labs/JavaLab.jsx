import { useCallback } from 'react';
import VisualLabShell from '../../components/lab/VisualLabShell';
import { javaExamples } from '../../data/labExamples';
import { runJavaDryRun } from '../../services/javaDryRun';

export default function JavaLab() {
  const onRunTrace = useCallback(async (code) => runJavaDryRun(code), []);

  return (
    <VisualLabShell
      language="java"
      badge="Code Lab · Java (beginner subset)"
      title="Java Visual Dry-Run Lab"
      subtitle="Practice simple Java-style programs in the browser and see memory change step by step. This lab teaches dry-run thinking with a beginner subset (variables, println, if/else, for loops) while we focus on Python as the first full course."
      tip="This is a teaching dry-runner — not a full JDK. Stick to the sample patterns (int, String, System.out.println, if/else, for). For full Python execution, open the Python lab."
      examples={javaExamples}
      defaultCode={javaExamples[0].code}
      onRunTrace={onRunTrace}
    />
  );
}
