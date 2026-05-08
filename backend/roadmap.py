RESOURCE_DB = {

    "python": {
        "resources": [
            (
                "Python for Everybody",
                "https://www.coursera.org/specializations/python"
            ),
            (
                "FreeCodeCamp Python",
                "https://www.youtube.com/watch?v=rfscVS0vtbw"
            )
        ],
        "project": "Build a Python automation assistant",
        "time": "2 Weeks",
        "difficulty": "Beginner"
    },

    "machine learning": {
        "resources": [
            (
                "Andrew Ng Machine Learning",
                "https://www.coursera.org/learn/machine-learning"
            ),
            (
                "Machine Learning Crash Course",
                "https://developers.google.com/machine-learning/crash-course"
            )
        ],
        "project": "Build a machine learning prediction system",
        "time": "4 Weeks",
        "difficulty": "Intermediate"
    },

    "deep learning": {
        "resources": [
            (
                "Deep Learning Specialization",
                "https://www.coursera.org/specializations/deep-learning"
            ),
            (
                "PyTorch Full Course",
                "https://www.youtube.com/watch?v=V_xro1bcAuA"
            )
        ],
        "project": "Build a neural network image classifier",
        "time": "6 Weeks",
        "difficulty": "Advanced"
    },

    "sql": {
        "resources": [
            (
                "SQL for Data Science",
                "https://www.coursera.org/learn/sql-for-data-science"
            ),
            (
                "W3Schools SQL",
                "https://www.w3schools.com/sql/"
            )
        ],
        "project": "Build a database management system",
        "time": "2 Weeks",
        "difficulty": "Beginner"
    },

    "docker": {
        "resources": [
            (
                "Docker Mastery",
                "https://www.udemy.com/course/docker-mastery/"
            ),
            (
                "Docker Tutorial",
                "https://www.youtube.com/watch?v=3c-iBn73dDE"
            )
        ],
        "project": "Containerize a full-stack application",
        "time": "3 Weeks",
        "difficulty": "Intermediate"
    },

    "tensorflow": {
        "resources": [
            (
                "TensorFlow Developer",
                "https://www.tensorflow.org/learn"
            ),
            (
                "TensorFlow Full Course",
                "https://www.youtube.com/watch?v=tPYj3fFJGjk"
            )
        ],
        "project": "Build an AI image recognition model",
        "time": "5 Weeks",
        "difficulty": "Advanced"
    },

    "pytorch": {
        "resources": [
            (
                "PyTorch Official Tutorials",
                "https://pytorch.org/tutorials/"
            ),
            (
                "PyTorch Full Course",
                "https://www.youtube.com/watch?v=V_xro1bcAuA"
            )
        ],
        "project": "Build a deep learning NLP system",
        "time": "5 Weeks",
        "difficulty": "Advanced"
    }
}


def generate_roadmap(gaps):

    roadmap = []

    def build_phase(title, skills):

        phase = {
            "title": title,
            "items": []
        }

        for skill in skills:

            data = RESOURCE_DB.get(skill, {

                "resources": [
                    (
                        "General Learning Resource",
                        "https://www.google.com"
                    )
                ],

                "project": f"Build a real-world project using {skill}",

                "time": "2 Weeks",

                "difficulty": "Intermediate"
            })

            phase["items"].append({

                "skill": skill,

                "resources": data["resources"],

                "project": data["project"],

                "time": data["time"],

                "difficulty": data["difficulty"],

                "progress": 0,

                "status": "Not Started"

            })

        return phase

    roadmap.append(
        build_phase(
            "Critical Skills",
            gaps["critical"]
        )
    )

    roadmap.append(
        build_phase(
            "Tools & Frameworks",
            gaps["tools"]
        )
    )

    roadmap.append(
        build_phase(
            "Supporting Skills",
            gaps["support"]
        )
    )

    return roadmap
