
#include <iostream>
#include <vector>
#include <bits/stdc++.h> 
using namespace std;

struct Process
{
    string name;
    int arrivalTime;
    int burstTime;
	int completionTime;
    int turnaroundTime;   
	int waitingTime;
	Process(string n, int a, int b):
		name(n), arrivalTime(a), burstTime(b), completionTime(0), turnaroundTime(0), waitingTime(0) {}
	Process(){}
};

bool compareByArrivalTime(const Process& a, const Process& b)
{
    return a.arrivalTime < b.arrivalTime;
}

void calculateCompletionTimes(vector<Process>& processes)
{	
	int sum = 0;
	vector<int> completionTimes;
	for(int i = 1; i < processes.size()+1; i++)
	{
		for(int j = 0; j < i; j++)
		{		
			sum = sum + processes[j].burstTime;			
		}
		completionTimes.push_back(sum);
		sum = 0;
	}

	for(int i = 0; i < processes.size(); i++)
	{		
		processes[i].completionTime = completionTimes[i];
	}
}

void calculateTurnaroundTimes(vector<Process>& processes)
{
	for(int i = 0; i < processes.size(); i++)
	{
		processes[i].turnaroundTime = processes[i].completionTime - processes[i].arrivalTime;
	}
}

void calculateWaitingTimes(vector<Process>& processes)
{
	for(int i = 0; i < processes.size(); i++)
	{
		processes[i].waitingTime = processes[i].turnaroundTime - processes[i].burstTime;
	}
}

void appendProcessInfo(vector<Process>& processes)
{
	calculateCompletionTimes (processes);
	calculateTurnaroundTimes (processes);
	calculateWaitingTimes (processes);
}


int main()
{
	int index = 0;
    bool areProcessesEntered = false;
    vector<Process> processes;
    while(areProcessesEntered == false)
    {       
        string userWantsToEnterProcess = "";
        processes.push_back(Process());
        cout<<"Enter process name ";
        cin >> processes[index].name;
		cout<<"Enter process arrival time ";
        cin >> processes[index].arrivalTime;
        cout<<"Enter process burst time ";
        cin >> processes[index].burstTime;
        index++;
        cout<<"Do you want to enter another process? [y/n] ";
        cin >> userWantsToEnterProcess;
        if(userWantsToEnterProcess == "n")
        {
            areProcessesEntered = true;
        }
    }
	sort(processes.begin(), processes.end(), compareByArrivalTime);
	appendProcessInfo(processes);

	cout<<"Name"<<"    "<<"AT"<<"    "<<"BT"<<"    "<<"CT"<<"    "<<"TT"<<"    "<<"WT"; 
	cout<<"\n";
	for(int i = 0; i < processes.size(); i++)
	{		
		cout<<processes[i].name<<"       "; 
		cout<<processes[i].arrivalTime<<"     "; 
		cout<<processes[i].burstTime<<"     "; 
		cout<<processes[i].completionTime<<"     "; 
		cout<<processes[i].turnaroundTime<<"     "; 
		cout<<processes[i].waitingTime;
		cout<<"\n";
	}
    return 0; 
}