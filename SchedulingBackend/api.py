from flask import Flask, jsonify, request, render_template, make_response, redirect
from RR import RoundRobin
import random

app = Flask(__name__)

MY_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=viaegnatia20;AccountKey=5q2myTqtPWSaS9OUwta5Woc0opbWgaaOluLHAOa7tiqjiXsDq2sFCqAmoFaJc5tPk/Z+8SaYmgyulgKB6Vk3ng==;EndpointSuffix=core.windows.net"
MY_IMAGE_CONTAINER = "egnatia20"


@app.route("/", methods=["GET"])
def get_and_return():
    if request.method == "GET":

        id = 5
        rand_gen = random.Random()

        burst_time_ls = []
        arrival_time_ls = []
        time_slice = rand_gen.randrange(10)

        for i in range(5):
            burst_time_ls.append(rand_gen.randrange(20))
            arrival_time_ls.append(i * 12)

    rr = RoundRobin()
    #rr.processData(id, burst_time=burst_time,time_slice=time_slice, arrival_time=arrival_time)

    print(burst_time_ls, time_slice, arrival_time_ls)
    at, aw, ep,completitont,turnaroundt,waitingt = rr.processData(id, burst_time =burst_time_ls, time_slice=3, arrival_time=arrival_time_ls)
    toreturn = [at, aw, ep]
    response = make_response(
        jsonify({
            'att': at,
            'awt': aw,
            'seq_processes': ep,
            'completion_time': completitont,
            'turnaround_time': turnaroundt,
            'waiting_time': waitingt
        })

    )
    return response


if __name__ == '__main__':
    app.run(debug=True)
