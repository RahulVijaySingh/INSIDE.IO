import os
import trimesh
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
EXPORT_FOLDER = "exports"
ALLOWED_EXTENSIONS = {"stl", "obj"}

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(EXPORT_FOLDER, exist_ok=True)

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)
        return jsonify({"message": "File uploaded successfully", "filename": filename}), 200

    return jsonify({"error": "Invalid file format"}), 400

@app.route("/models/<filename>", methods=["GET"])
def get_model(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

@app.route("/export", methods=["POST"])
def export_model():
    data = request.json
    filename = data.get("filename")

    if not filename or not allowed_file(filename):
        return jsonify({"error": "Invalid file format"}), 400

    input_path = os.path.join(UPLOAD_FOLDER, filename)
    file_ext = filename.rsplit(".", 1)[1].lower()

    if file_ext == "stl":
        output_filename = filename.replace(".stl", ".obj")
    elif file_ext == "obj":
        output_filename = filename.replace(".obj", ".stl")
    else:
        return jsonify({"error": "Unsupported conversion"}), 400

    output_path = os.path.join(EXPORT_FOLDER, output_filename)

    if not os.path.exists(input_path):
        return jsonify({"error": "File not found"}), 404

    try:
        mesh = trimesh.load_mesh(input_path)
        mesh.export(output_path)
        return jsonify({"message": "Export successful", "exported_filename": output_filename}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/exports/<filename>", methods=["GET"])
def get_exported_model(filename):
    return send_from_directory(EXPORT_FOLDER, filename)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
