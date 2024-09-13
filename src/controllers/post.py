from flask import Blueprint, request
from src.app import Post, db
from http import HTTPStatus


app = Blueprint('post', __name__, url_prefix='/posts')


def _create_post():
	data = request.json
	post = Post(title=data["title"])
	db.session.add(post)
	db.session.commit()

@app.route('/', methods=['GET', 'POST'])
def handle_post():
	if request.method == "POST":
		return {"message": "Post created!"}, HTTPStatus.CREATED
	else:
		return {"title": []}