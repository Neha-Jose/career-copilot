from pymongo import MongoClient

MONGO_URI = "mongodb://localhost:27017/"

client = MongoClient(MONGO_URI)

db = client["career_copilot"]

collection = db["analysis"]


def save_analysis(data):
    try:
        collection.insert_one(data)
        print("Saved to MongoDB")
    except Exception as e:
        print("MongoDB Error:", e)