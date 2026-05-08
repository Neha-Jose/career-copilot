import { useState } from "react";
import API from "./services/api";

function App() {

  const [resume, setResume] = useState(null);
  const [role, setRole] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("jobseekers");

  const [completedTasks, setCompletedTasks] = useState({});

  const toggleTask = (taskId) => {

    setCompletedTasks((prev) => ({

      ...prev,

      [taskId]: !prev[taskId]

    }));

  };

  const handleSubmit = async () => {

    if (!resume || !role) {

      alert("Upload resume and enter role");

      return;
    }

    const formData = new FormData();

    formData.append("resume", resume);
    formData.append("role", role);

    try {

      setLoading(true);

      const response = await API.post(
        "/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setData(response.data);

    } catch (err) {

      console.error(err);

      alert("Backend connection failed");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen bg-[#081120] text-white">

      {/* NAVBAR */}

      <div className="border-b border-slate-800 bg-[#091424]">

        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

          <div>

            <h1 className="text-3xl font-bold text-cyan-400">
              ACIP
            </h1>

            <p className="text-slate-400 text-sm">
              AI Career Intelligence Platform
            </p>

          </div>

          <div className="flex gap-4">

            <button
              onClick={() => setActiveTab("jobseekers")}
              className={`px-6 py-3 rounded-2xl transition ${
                activeTab === "jobseekers"
                  ? "bg-cyan-500 text-black"
                  : "bg-[#132238]"
              }`}
            >
              Job Seekers
            </button>

            <button
              onClick={() => setActiveTab("recruiters")}
              className={`px-6 py-3 rounded-2xl transition ${
                activeTab === "recruiters"
                  ? "bg-cyan-500 text-black"
                  : "bg-[#132238]"
              }`}
            >
              Recruiters
            </button>

            <button
              onClick={() => setActiveTab("enterprise")}
              className={`px-6 py-3 rounded-2xl transition ${
                activeTab === "enterprise"
                  ? "bg-cyan-500 text-black"
                  : "bg-[#132238]"
              }`}
            >
              Enterprise
            </button>

          </div>

        </div>

      </div>

      {/* JOB SEEKERS */}

      {activeTab === "jobseekers" && (

        <>

          {/* HERO */}

          <div className="max-w-7xl mx-auto p-8">

            <div className="bg-[#0d1b2e] border border-slate-800 rounded-3xl p-16">

              <h1 className="text-6xl font-bold mb-6">
                Build Your Career Strategy
              </h1>

              <p className="text-slate-400 text-xl max-w-4xl">
                Upload your resume to receive ATS scoring, skill gap analysis,
                dynamic learning roadmaps, and AI-powered career intelligence.
              </p>

            </div>

          </div>

          {/* ANALYZER */}

          <div className="max-w-7xl mx-auto px-8 pb-10">

            <div className="bg-[#0d1b2e] border border-slate-800 rounded-3xl p-8">

              <div className="grid md:grid-cols-2 gap-6">

                <input
                  type="file"
                  onChange={(e) => setResume(e.target.files[0])}
                  className="bg-[#132238] border border-slate-700 rounded-2xl p-4"
                />

                <input
                  type="text"
                  placeholder="Target Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="bg-[#132238] border border-slate-700 rounded-2xl p-4"
                />

              </div>

              <button
                onClick={handleSubmit}
                className="mt-6 bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-8 py-4 rounded-2xl font-bold"
              >
                {loading ? "Analyzing..." : "Analyze Resume"}
              </button>

            </div>

          </div>

          {/* RESULTS */}

          {data && (

            <div className="max-w-7xl mx-auto px-8 pb-20">

              {/* METRICS */}

              <div className="grid md:grid-cols-3 gap-6 mb-8">

                <div className="bg-[#0d1b2e] border border-slate-800 rounded-3xl p-8">

                  <p className="text-slate-400 mb-4">
                    ATS Score
                  </p>

                  <h2 className="text-6xl font-bold text-cyan-400">
                    {data.score}%
                  </h2>

                </div>

                <div className="bg-[#0d1b2e] border border-slate-800 rounded-3xl p-8">

                  <p className="text-slate-400 mb-4">
                    Skills Found
                  </p>

                  <h2 className="text-6xl font-bold">
                    {data.skills?.length || 0}
                  </h2>

                </div>

                <div className="bg-[#0d1b2e] border border-slate-800 rounded-3xl p-8">

                  <p className="text-slate-400 mb-4">
                    Missing Skills
                  </p>

                  <h2 className="text-6xl font-bold text-orange-400">

                    {
                      (data.gaps?.critical?.length || 0) +
                      (data.gaps?.tools?.length || 0) +
                      (data.gaps?.support?.length || 0)
                    }

                  </h2>

                </div>

              </div>

              {/* DYNAMIC ROADMAP */}

              <div className="bg-[#0d1b2e] border border-slate-800 rounded-3xl p-8">

                <div className="flex justify-between items-center mb-10">

                  <div>

                    <h2 className="text-4xl font-bold">
                      Dynamic Career Roadmap
                    </h2>

                    <p className="text-slate-400 mt-2">
                      Track your progress and complete milestones
                    </p>

                  </div>

                  <div className="bg-cyan-500/20 text-cyan-400 px-5 py-3 rounded-2xl">

                    {
                      Object.values(completedTasks).filter(Boolean).length
                    }

                    {" "}Completed

                  </div>

                </div>

                <div className="space-y-8">

                  {data.roadmap?.map((phase, phaseIndex) => (

                    <div
                      key={phaseIndex}
                      className="bg-[#132238] border border-slate-700 rounded-3xl p-8"
                    >

                      <h3 className="text-3xl font-bold mb-8">
                        {phase.title}
                      </h3>

                      <div className="space-y-6">

                        {phase.items?.map((item, itemIndex) => {

                          const taskId = `${phaseIndex}-${itemIndex}`;

                          const completed = completedTasks[taskId];

                          return (

                            <div
                              key={itemIndex}
                              className={`rounded-3xl border p-6 ${
                                completed
                                  ? "bg-green-500/10 border-green-500/30"
                                  : "bg-[#0d1b2e] border-slate-700"
                              }`}
                            >

                              <div className="flex justify-between mb-6">

                                <div className="flex gap-4">

                                  <button
                                    onClick={() => toggleTask(taskId)}
                                    className={`w-8 h-8 rounded-xl border-2 ${
                                      completed
                                        ? "bg-green-500 border-green-500"
                                        : "border-slate-500"
                                    }`}
                                  >
                                    {completed && "✓"}
                                  </button>

                                  <div>

                                    <h4 className="text-2xl font-bold mb-2">
                                      {item.skill}
                                    </h4>

                                    <p className="text-slate-400">
                                      Timeline: {item.time}
                                    </p>

                                  </div>

                                </div>

                                <div className={`px-4 py-2 rounded-xl ${
                                  completed
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-cyan-500/20 text-cyan-400"
                                }`}>

                                  {completed ? "Completed" : "In Progress"}

                                </div>

                              </div>

                              <div className="w-full bg-slate-800 rounded-full h-3 mb-8">

                                <div
                                  className={`h-3 rounded-full ${
                                    completed
                                      ? "w-full bg-green-500"
                                      : "w-1/3 bg-cyan-400"
                                  }`}
                                ></div>

                              </div>

                              <div className="grid md:grid-cols-2 gap-6">

                                {item.resources?.map((resource, index) => (

                                  <a
                                    key={index}
                                    href={resource[1]}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-[#132238] border border-slate-700 hover:border-cyan-400 rounded-2xl p-5 transition"
                                  >

                                    <p className="font-semibold mb-2">
                                      {resource[0]}
                                    </p>

                                    <p className="text-sm text-slate-400">
                                      Open Resource
                                    </p>

                                  </a>

                                ))}

                              </div>

                            </div>

                          );

                        })}

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          )}

        </>

      )}

      {/* RECRUITERS */}

      {activeTab === "recruiters" && (

        <div className="max-w-7xl mx-auto p-8">

          <div className="bg-[#0d1b2e] border border-slate-800 rounded-3xl p-16">

            <h1 className="text-5xl font-bold mb-6">
              Recruiter Intelligence Dashboard
            </h1>

            <p className="text-slate-400 text-xl mb-12">
              AI-powered candidate screening and hiring analytics.
            </p>

            <div className="grid md:grid-cols-3 gap-6">

              <div className="bg-[#132238] rounded-3xl p-8 border border-slate-700">

                <p className="text-slate-400 mb-4">
                  Candidates Screened
                </p>

                <h2 className="text-5xl font-bold text-cyan-400">
                  1,248
                </h2>

              </div>

              <div className="bg-[#132238] rounded-3xl p-8 border border-slate-700">

                <p className="text-slate-400 mb-4">
                  Hiring Accuracy
                </p>

                <h2 className="text-5xl font-bold text-green-400">
                  92%
                </h2>

              </div>

              <div className="bg-[#132238] rounded-3xl p-8 border border-slate-700">

                <p className="text-slate-400 mb-4">
                  Time Saved
                </p>

                <h2 className="text-5xl font-bold text-orange-400">
                  70%
                </h2>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* ENTERPRISE */}

      {activeTab === "enterprise" && (

        <div className="max-w-7xl mx-auto p-8">

          <div className="bg-[#0d1b2e] border border-slate-800 rounded-3xl p-16">

            <h1 className="text-5xl font-bold mb-6">
              Enterprise Workforce Intelligence
            </h1>

            <p className="text-slate-400 text-xl mb-12">
              AI-powered workforce analytics and skill development insights.
            </p>

            <div className="grid md:grid-cols-3 gap-6">

              <div className="bg-[#132238] rounded-3xl p-8 border border-slate-700">

                <p className="text-slate-400 mb-4">
                  Employees Tracked
                </p>

                <h2 className="text-5xl font-bold text-cyan-400">
                  4,820
                </h2>

              </div>

              <div className="bg-[#132238] rounded-3xl p-8 border border-slate-700">

                <p className="text-slate-400 mb-4">
                  Skill Growth
                </p>

                <h2 className="text-5xl font-bold text-green-400">
                  88%
                </h2>

              </div>

              <div className="bg-[#132238] rounded-3xl p-8 border border-slate-700">

                <p className="text-slate-400 mb-4">
                  AI Recommendations
                </p>

                <h2 className="text-5xl font-bold text-orange-400">
                  12K+
                </h2>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  );
}

export default App;
