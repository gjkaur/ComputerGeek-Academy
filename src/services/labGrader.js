/**
 * Auto-grade student lab submissions from instructor-defined checks.
 * Checks are substring / expected-output based so they work offline without Pyodide.
 */

export function gradeLabSubmission(lab, code) {
  const source = (code || '').replace(/\r\n/g, '\n');
  const failures = [];

  if (!source.trim()) {
    return { passed: false, score: 0, failures: ['Solution is empty.'] };
  }

  const required = lab.requiredSubstrings || [];
  for (const needle of required) {
    if (!source.includes(needle)) {
      failures.push(`Missing required code: ${needle}`);
    }
  }

  const forbidden = lab.forbiddenSubstrings || [];
  for (const needle of forbidden) {
    if (needle && source.includes(needle)) {
      failures.push(`Forbidden pattern found: ${needle}`);
    }
  }

  const expectedBits = lab.expectedOutputContains || [];
  if (expectedBits.length > 0) {
    // Approximate output by collecting string literals inside print(...)
    const prints = [...source.matchAll(/print\s*\(\s*(["'`])([\s\S]*?)\1\s*\)/g)].map(
      (m) => m[2],
    );
    const joined = prints.join('\n');
    for (const bit of expectedBits) {
      if (!joined.includes(bit) && !source.includes(bit)) {
        failures.push(`Expected output to include: ${bit}`);
      }
    }
  }

  const totalChecks = Math.max(1, required.length + forbidden.length + expectedBits.length);
  const failed = failures.length;
  const score = Math.round(((totalChecks - failed) / totalChecks) * 100);
  const passed = failures.length === 0;

  return { passed, score: passed ? Math.max(score, 100) : score, failures };
}
