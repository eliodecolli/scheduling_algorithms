from flask import Flask, jsonify, request, render_template, make_response, redirect
from RR import RoundRobin

app = Flask(__name__)

MY_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=viaegnatia20;AccountKey=5q2myTqtPWSaS9OUwta5Woc0opbWgaaOluLHAOa7tiqjiXsDq2sFCqAmoFaJc5tPk/Z+8SaYmgyulgKB6Vk3ng==;EndpointSuffix=core.windows.net"
MY_IMAGE_CONTAINER = "egnatia20"


@app.route("/", methods=["GET", "POST"])
def get_and_return():
    if request.method == "POST":

        id = int(request.form['id'])

        burst_time_raw = request.form['burst_time']
        burst_time = [x.strip() for x in burst_time_raw.split(',')]
        burst_time_ls = []
        for n in burst_time:
            burst_time_ls.append(int(n))
            #burst_time = burst_time_ls

        time_slice = int(request.form['time_slice'])

        arrival_time_raw = request.form['arrival_time']
        arrival_time = list([x.strip() for x in arrival_time_raw.split(',')])
        arrival_time_ls = []
        for n in arrival_time:
            arrival_time_ls.append(int(n))
            #arrival_time = arrival_time_ls

    rr = RoundRobin()
    #rr.processData(id, burst_time=burst_time,time_slice=time_slice, arrival_time=arrival_time)

    print(burst_time_ls, time_slice, arrival_time_ls)
    at, aw, ep = rr.processData(id, burst_time =burst_time_ls, time_slice=3, arrival_time=arrival_time_ls)
    toreturn = [at, aw, ep]
    response = make_response(
        jsonify({
            'Average Turnaround Time':at,
            'Average Waiting Time':aw,
            'Sequence of Processes':ep
        })

    )
    return response


if __name__ == '__main__':
    app.run(debug=True)
