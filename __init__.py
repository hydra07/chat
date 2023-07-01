import time
from flask import Flask, render_template, request, url_for, session, redirect, Response
from flask_sse import sse
import controller
import data


app = Flask(__name__)
# app.config['SECRET_KEY'] = 'hehe'
# app.config['SESSION_TYPE'] = 'filesystem'
# app.config["REDIS_URL"] = "redis://localhost"
# Session(app)
# app.register_blueprint(sse, url_prefix='/chatdata')
# -----------------------------------------------------------------------------------------------------------------------------------------------
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat/<username>', methods=['GET','POST'])
def chat(username):
    # username = session.get('username')
    # chatdata = controller.read()
    chatdata = controller.read_from_csv()
    if 'text' in request.form:
        # text = request.form['text']
        # text = {
        #     'user': username,
        #     'text': request.form['text'],
        #     'time':data.now
        #     }
        text =[username, request.form['text'], data.now]
        # controller.write(text)
        controller.append_to_csv(text)
        # chat_data = controller.read()
    return render_template('chat.html',
                            title='Chat from'+username,
                            # data=chatdata,
                            username=username
    )
@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    # session['username'] = username
    return redirect('/chat/'+username)

@app.route('/chatdata')
def chatdata():
    return controller.list_of_lists_to_list_of_dicts(controller.read_from_csv())

# @app.route('/chatdata/stream')
# def stream():
#     def generate_data():
#         # Tạo dữ liệu SSE mới và gửi đến máy khách
#         while True:
#             data = chatdata()
#             sse.publish(data, type='chatdata')
#             time.sleep(1)  # Thời gian chờ trước khi gửi dữ liệu mới

#     return Response(generate_data(), mimetype='text/event-stream')


if __name__ == '__main__':
    app.run(debug=True)