import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, Upload } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useApp } from '../../context/AppProvider';
import { categories } from '../../data/siteContent';
import { createEmptyCourse } from '../../data/courseCatalog';
import { DEFAULT_THUMBNAIL, SAMPLE_VIDEO_URL } from '../../data/siteContent';
import { fileToDataUrl } from '../../utils/mediaUpload';

const inputClass =
  'w-full rounded-xl border border-navy-200 px-4 py-2.5 text-navy-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20';
const labelClass = 'mb-1 block text-sm font-medium text-navy-700';

export default function CourseEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCourseById, addCourse, updateCourse } = useApp();
  const isNew = !id || id === 'new';

  const [course, setCourse] = useState(() => {
    if (isNew) return createEmptyCourse();
    return getCourseById(id) ? { ...getCourseById(id) } : null;
  });
  const [activeTab, setActiveTab] = useState('basic');
  const [saved, setSaved] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    if (!isNew && !getCourseById(id)) {
      navigate('/admin/courses');
    }
  }, [id, isNew, getCourseById, navigate]);

  if (!course) return null;

  const update = (field, value) => {
    setCourse((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadError('');
      const url = await fileToDataUrl(file);
      update('thumbnail', url);
    } catch (err) {
      setUploadError(err.message);
    }
  };

  const handleVideoUpload = async (modId, lessonId, file) => {
    if (!file) return;
    try {
      setUploadError('');
      const url = await fileToDataUrl(file, { maxBytes: 6 * 1024 * 1024 });
      update(
        'modules',
        course.modules.map((m) =>
          m.id === modId
            ? {
                ...m,
                lessons: m.lessons.map((l) =>
                  l.id === lessonId ? { ...l, videoUrl: url, videoFileName: file.name } : l,
                ),
              }
            : m,
        ),
      );
    } catch (err) {
      setUploadError(err.message);
    }
  };

  const handleSave = () => {
    if (isNew) {
      addCourse(course);
      navigate(`/admin/courses/${course.id}/edit`, { replace: true });
    } else {
      updateCourse(course.id, course);
    }
    setSaved(true);
  };

  const addModule = () => {
    const modId = `mod-${Date.now()}`;
    update('modules', [
      ...course.modules,
      { id: modId, title: 'New Module', order: course.modules.length + 1, lessons: [] },
    ]);
  };

  const updateModule = (modId, field, value) => {
    update(
      'modules',
      course.modules.map((m) => (m.id === modId ? { ...m, [field]: value } : m)),
    );
  };

  const deleteModule = (modId) => {
    update('modules', course.modules.filter((m) => m.id !== modId));
  };

  const addLesson = (modId, type = 'video') => {
    const lessonId = `lesson-${Date.now()}`;
    const base = { id: lessonId, title: 'New Lesson', type };
    let lesson = base;
    if (type === 'video') lesson = { ...base, duration: '10 min', videoUrl: SAMPLE_VIDEO_URL };
    if (type === 'quiz') {
      const quizId = `quiz-${Date.now()}`;
      lesson = { ...base, title: 'New Quiz', quizId };
      update('quizzes', [
        ...(course.quizzes || []),
        { id: quizId, title: 'New Quiz', passingScore: 70, questions: [] },
      ]);
    }
    if (type === 'assignment') {
      const assignmentId = `assign-${Date.now()}`;
      lesson = { ...base, title: 'New Assignment', assignmentId };
      update('assignments', [
        ...(course.assignments || []),
        {
          id: assignmentId,
          title: 'New Assignment',
          description: '',
          instructions: 'Complete the assignment as described.',
        },
      ]);
    }
    if (type === 'lab') {
      const labId = `lab-${Date.now()}`;
      lesson = { ...base, title: 'New Lab', labId };
      update('labs', [
        ...(course.labs || []),
        {
          id: labId,
          title: 'New Lab',
          description: 'Students must submit a passing solution for the certificate.',
          steps: ['Read the instructions', 'Write your solution', 'Submit for auto-grading'],
          objectives: ['Pass the auto-grader'],
          language: 'python',
          starterCode: '# Write your solution\nprint("Hello")\n',
          requiredSubstrings: ['print('],
          expectedOutputContains: ['Hello'],
          forbiddenSubstrings: [],
        },
      ]);
    }
    if (type === 'reading') lesson = { ...base, content: 'Reading content here.' };

    update(
      'modules',
      course.modules.map((m) =>
        m.id === modId ? { ...m, lessons: [...m.lessons, lesson] } : m,
      ),
    );
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'modules', label: 'Modules & Lessons' },
    { id: 'quizzes', label: 'Quizzes' },
    { id: 'assignments', label: 'Assignments' },
    { id: 'labs', label: 'Labs' },
    { id: 'resources', label: 'Resources' },
  ];

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/admin/courses"
          className="inline-flex items-center gap-2 text-sm font-medium text-navy-600 hover:text-brand-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </Link>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm text-green-600">Saved!</span>}
          {uploadError && <span className="text-sm text-red-600">{uploadError}</span>}
          <Button onClick={handleSave}>
            <Save className="h-4 w-4" />
            Save Course
          </Button>
        </div>
      </div>

      <h2 className="mb-6 text-2xl font-bold text-navy-900">
        {isNew ? 'Create New Course' : `Edit: ${course.title}`}
      </h2>

      <div className="mb-6 flex flex-wrap gap-2 border-b border-navy-100 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-brand-500 text-white'
                : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
        {activeTab === 'basic' && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className={labelClass}>Course Title</label>
              <input
                className={inputClass}
                value={course.title}
                onChange={(e) => update('title', e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Short Description</label>
              <textarea
                className={inputClass}
                rows={2}
                value={course.description}
                onChange={(e) => update('description', e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Long Description</label>
              <textarea
                className={inputClass}
                rows={4}
                value={course.longDescription}
                onChange={(e) => update('longDescription', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Instructor</label>
              <input
                className={inputClass}
                value={course.instructor}
                onChange={(e) => update('instructor', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Category</label>
              <select
                className={inputClass}
                value={course.categoryId}
                onChange={(e) => {
                  const cat = categories.find((c) => c.id === e.target.value);
                  update('categoryId', e.target.value);
                  if (cat) update('category', cat.name);
                }}
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Level</label>
              <select
                className={inputClass}
                value={course.level}
                onChange={(e) => update('level', e.target.value)}
              >
                {['Beginner', 'Intermediate', 'Advanced'].map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Duration</label>
              <input
                className={inputClass}
                value={course.duration}
                onChange={(e) => update('duration', e.target.value)}
                placeholder="e.g. 12 hours"
              />
            </div>
            <div>
              <label className={labelClass}>Price (USD)</label>
              <input
                type="number"
                className={inputClass}
                value={course.priceAmount}
                onChange={(e) => update('priceAmount', Number(e.target.value))}
              />
            </div>
            <div>
              <label className={labelClass}>Thumbnail</label>
              <div className="flex items-center gap-4">
                <img
                  src={course.thumbnail || DEFAULT_THUMBNAIL}
                  alt="Thumbnail"
                  className="h-20 w-32 rounded-lg object-cover"
                />
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-navy-300 px-4 py-3 text-sm text-navy-600 hover:border-brand-400">
                  <Upload className="h-4 w-4" />
                  Upload
                  <input type="file" accept="image/*" className="hidden" onChange={handleThumbnailUpload} />
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={course.published}
                  onChange={(e) => update('published', e.target.checked)}
                  className="rounded text-brand-500"
                />
                <span className="text-sm font-medium text-navy-700">Published</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={course.featured}
                  onChange={(e) => update('featured', e.target.checked)}
                  className="rounded text-brand-500"
                />
                <span className="text-sm font-medium text-navy-700">Featured</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={course.certificateEnabled}
                  onChange={(e) => update('certificateEnabled', e.target.checked)}
                  className="rounded text-brand-500"
                />
                <span className="text-sm font-medium text-navy-700">Certificate Enabled</span>
              </label>
            </div>
          </div>
        )}

        {activeTab === 'modules' && (
          <div className="space-y-6">
            <Button onClick={addModule} size="sm" variant="outline">
              <Plus className="h-4 w-4" /> Add Module
            </Button>
            {course.modules.map((mod) => (
              <div key={mod.id} className="rounded-xl border border-navy-100 p-4">
                <div className="mb-4 flex items-center gap-3">
                  <input
                    className={`${inputClass} flex-1`}
                    value={mod.title}
                    onChange={(e) => updateModule(mod.id, 'title', e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => deleteModule(mod.id)}
                    className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mb-3 flex flex-wrap gap-2">
                  {['video', 'reading', 'quiz', 'assignment', 'lab'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => addLesson(mod.id, type)}
                      className="rounded-lg bg-navy-50 px-3 py-1 text-xs font-medium text-navy-700 hover:bg-brand-50"
                    >
                      + {type}
                    </button>
                  ))}
                </div>
                <ul className="space-y-2">
                  {mod.lessons.map((lesson) => (
                    <li key={lesson.id} className="flex items-center gap-2 rounded-lg bg-navy-50 px-3 py-2 text-sm">
                      <span className="rounded bg-white px-2 py-0.5 text-xs font-medium uppercase text-brand-600">
                        {lesson.type}
                      </span>
                      <input
                        className="flex-1 bg-transparent text-navy-800 focus:outline-none"
                        value={lesson.title}
                        onChange={(e) => {
                          update(
                            'modules',
                            course.modules.map((m) =>
                              m.id === mod.id
                                ? {
                                    ...m,
                                    lessons: m.lessons.map((l) =>
                                      l.id === lesson.id ? { ...l, title: e.target.value } : l,
                                    ),
                                  }
                                : m,
                            ),
                          );
                        }}
                      />
                      {lesson.type === 'video' && (
                        <>
                          <input
                            className="w-40 rounded border border-navy-200 px-2 py-1 text-xs"
                            placeholder="Video URL"
                            value={lesson.videoUrl?.startsWith('data:') ? '' : lesson.videoUrl || ''}
                            onChange={(e) => {
                              update(
                                'modules',
                                course.modules.map((m) =>
                                  m.id === mod.id
                                    ? {
                                        ...m,
                                        lessons: m.lessons.map((l) =>
                                          l.id === lesson.id
                                            ? { ...l, videoUrl: e.target.value, videoFileName: undefined }
                                            : l,
                                        ),
                                      }
                                    : m,
                                ),
                              );
                            }}
                          />
                          <label className="inline-flex cursor-pointer items-center gap-1 rounded border border-dashed border-navy-300 px-2 py-1 text-xs text-brand-600">
                            <Upload className="h-3 w-3" />
                            {lesson.videoFileName || 'Upload video'}
                            <input
                              type="file"
                              accept="video/*,.mp4,.webm"
                              className="hidden"
                              onChange={(e) =>
                                handleVideoUpload(mod.id, lesson.id, e.target.files?.[0])
                              }
                            />
                          </label>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'quizzes' && (
          <div className="space-y-4">
            <p className="text-sm text-navy-500">
              Quizzes linked from module lessons. Add questions below.
            </p>
            {(course.quizzes || []).map((quiz, qi) => (
              <div key={quiz.id} className="rounded-xl border border-navy-100 p-4">
                <input
                  className={`${inputClass} mb-3`}
                  value={quiz.title}
                  onChange={(e) => {
                    const updated = [...course.quizzes];
                    updated[qi] = { ...quiz, title: e.target.value };
                    update('quizzes', updated);
                  }}
                />
                <p className="mb-2 text-xs text-navy-400">ID: {quiz.id}</p>
                {(quiz.questions || []).map((q, qIdx) => (
                  <div key={q.id} className="mb-3 rounded-lg bg-navy-50 p-3">
                    <input
                      className={`${inputClass} mb-2`}
                      value={q.question}
                      placeholder="Question"
                      onChange={(e) => {
                        const updated = [...course.quizzes];
                        const questions = [...quiz.questions];
                        questions[qIdx] = { ...q, question: e.target.value };
                        updated[qi] = { ...quiz, questions };
                        update('quizzes', updated);
                      }}
                    />
                    {q.options.map((opt, oi) => (
                      <input
                        key={oi}
                        className={`${inputClass} mb-1 text-sm`}
                        value={opt}
                        onChange={(e) => {
                          const updated = [...course.quizzes];
                          const questions = [...quiz.questions];
                          const options = [...q.options];
                          options[oi] = e.target.value;
                          questions[qIdx] = { ...q, options };
                          updated[qi] = { ...quiz, questions };
                          update('quizzes', updated);
                        }}
                      />
                    ))}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const updated = [...course.quizzes];
                    updated[qi] = {
                      ...quiz,
                      questions: [
                        ...(quiz.questions || []),
                        {
                          id: `q-${Date.now()}`,
                          question: 'New question?',
                          options: ['Option A', 'Option B', 'Option C', 'Option D'],
                          correctIndex: 0,
                        },
                      ],
                    };
                    update('quizzes', updated);
                  }}
                  className="text-sm text-brand-500 hover:underline"
                >
                  + Add Question
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'assignments' && (
          <div className="space-y-4">
            {(course.assignments || []).map((a, ai) => (
              <div key={a.id} className="rounded-xl border border-navy-100 p-4">
                <input
                  className={`${inputClass} mb-2`}
                  value={a.title}
                  onChange={(e) => {
                    const updated = [...course.assignments];
                    updated[ai] = { ...a, title: e.target.value };
                    update('assignments', updated);
                  }}
                />
                <textarea
                  className={`${inputClass} mb-2`}
                  rows={2}
                  placeholder="Description"
                  value={a.description}
                  onChange={(e) => {
                    const updated = [...course.assignments];
                    updated[ai] = { ...a, description: e.target.value };
                    update('assignments', updated);
                  }}
                />
                <textarea
                  className={inputClass}
                  rows={3}
                  placeholder="Instructions"
                  value={a.instructions}
                  onChange={(e) => {
                    const updated = [...course.assignments];
                    updated[ai] = { ...a, instructions: e.target.value };
                    update('assignments', updated);
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'labs' && (
          <div className="space-y-4">
            <p className="text-sm text-navy-600">
              Students must submit a passing solution (auto-graded) before a certificate can be issued.
              Define starter code and required substrings / expected output phrases.
            </p>
            {(course.labs || []).map((lab, li) => (
              <div key={lab.id} className="rounded-xl border border-navy-100 p-4 space-y-3">
                <input
                  className={inputClass}
                  value={lab.title}
                  onChange={(e) => {
                    const updated = [...course.labs];
                    updated[li] = { ...lab, title: e.target.value };
                    update('labs', updated);
                  }}
                />
                <textarea
                  className={inputClass}
                  rows={2}
                  value={lab.description}
                  onChange={(e) => {
                    const updated = [...course.labs];
                    updated[li] = { ...lab, description: e.target.value };
                    update('labs', updated);
                  }}
                />
                <textarea
                  className={inputClass}
                  rows={3}
                  placeholder="Steps (one per line)"
                  value={(lab.steps || []).join('\n')}
                  onChange={(e) => {
                    const updated = [...course.labs];
                    updated[li] = { ...lab, steps: e.target.value.split('\n').filter(Boolean) };
                    update('labs', updated);
                  }}
                />
                <label className={labelClass}>Starter code</label>
                <textarea
                  className={`${inputClass} font-mono text-sm`}
                  rows={5}
                  value={lab.starterCode || ''}
                  onChange={(e) => {
                    const updated = [...course.labs];
                    updated[li] = { ...lab, starterCode: e.target.value };
                    update('labs', updated);
                  }}
                />
                <label className={labelClass}>Required substrings (one per line)</label>
                <textarea
                  className={`${inputClass} font-mono text-sm`}
                  rows={2}
                  value={(lab.requiredSubstrings || []).join('\n')}
                  onChange={(e) => {
                    const updated = [...course.labs];
                    updated[li] = {
                      ...lab,
                      requiredSubstrings: e.target.value.split('\n').filter(Boolean),
                    };
                    update('labs', updated);
                  }}
                />
                <label className={labelClass}>Expected output contains (one per line)</label>
                <textarea
                  className={`${inputClass} font-mono text-sm`}
                  rows={2}
                  value={(lab.expectedOutputContains || []).join('\n')}
                  onChange={(e) => {
                    const updated = [...course.labs];
                    updated[li] = {
                      ...lab,
                      expectedOutputContains: e.target.value.split('\n').filter(Boolean),
                    };
                    update('labs', updated);
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-4">
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                update('resources', [
                  ...(course.resources || []),
                  {
                    id: `res-${Date.now()}`,
                    title: 'New Resource',
                    fileName: 'document.pdf',
                    fileUrl: '#',
                    type: 'pdf',
                  },
                ])
              }
            >
              <Plus className="h-4 w-4" /> Add Resource
            </Button>
            {(course.resources || []).map((r, ri) => (
              <div key={r.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-navy-100 p-4">
                <input
                  className={`${inputClass} flex-1`}
                  value={r.title}
                  onChange={(e) => {
                    const updated = [...course.resources];
                    updated[ri] = { ...r, title: e.target.value };
                    update('resources', updated);
                  }}
                />
                <input
                  className={`${inputClass} w-40`}
                  value={r.fileName}
                  placeholder="File name"
                  onChange={(e) => {
                    const updated = [...course.resources];
                    updated[ri] = { ...r, fileName: e.target.value };
                    update('resources', updated);
                  }}
                />
                <label className="inline-flex cursor-pointer items-center gap-1 text-sm text-brand-500">
                  <Upload className="h-4 w-4" />
                  Upload
                  <input
                    type="file"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        setUploadError('');
                        const fileUrl = await fileToDataUrl(file);
                        const updated = [...course.resources];
                        updated[ri] = {
                          ...r,
                          fileName: file.name,
                          fileUrl,
                        };
                        update('resources', updated);
                      } catch (err) {
                        setUploadError(err.message);
                      }
                    }}
                  />
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
