from pymongo import MongoClient
import certifi

MONGO_URI = "mongodb+srv://neha:neha@cluster.sq8se9a.mongodb.net/?appName=Cluster0"

client = MongoClient(
    MONGO_URI,
    tls=True,
    tlsCAFile=certifi.where()
)

db = client["career_copilot"]

collection = db["analysis"]


def save_analysis(data):

    try:

        collection.insert_one(data)

        print("Saved to MongoDB")

    except Exception as e:

        print("MongoDB Error:", e)
