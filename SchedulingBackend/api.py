from flask import Flask, jsonify, request, render_template, make_response, redirect
from RR import RoundRobin
import random

app = Flask(__name__)

def _build_cors_prelight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route("/", methods=["GET", "OPTIONS"])
def get_and_return():
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()

    if request.method == "GET":

        id = 5
        rand_gen = random.Random()

        burst_time_ls = []
        arrival_time_ls = []
        time_slice = rand_gen.randrange(10)

        for i in range(5):
            burst_time_ls.append(rand_gen.randrange(20))
            arrival_time_ls.append(i * 2)

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
    return _corsify_actual_response(response)


if __name__ == '__main__':
    app.run(debug=True)
