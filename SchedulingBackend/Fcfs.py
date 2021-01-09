#Scheduling algorithem first come first serve

#Needed inputs, number of processes, arrival time and burst time
def sort(at, bt, N):
    
    for i in range (len(at)):

        sorted = True

        for j in range(len(at) - i - 1):
            if at[j] > at [j + 1]:
                at[j], at [j + 1] = at [j + 1], at [j]

                bt[j], bt [j + 1] = bt [j + 1], bt [j]

                N[j], N[j + 1] = N[j + 1], N[j]

                sorted = False
        
        if sorted:
            break
    
    return at,bt,N



def schedulingAlgorithem (at, bt, N):

    sort(at,bt,N)
    n = len(N)
    #Array of waiting time
    wt = [0]*n
    tat = [0]*n
    
    #First element waiting time is 0
    wt[0] = 0
    tat[0] = bt[0]

    print("P.No.\tArrival Time\t" , "Burst Time\tWaiting Time\tTurn Around Time")
    print(N[0] , "\t\t" , at[0] , "\t\t" , bt[0] , "\t\t" , wt[0], "\t\t", tat[0])


    #Loop for next processes
    for i in range (1, n):
        tat[i] = (at[i - 1] + bt [i - 1] + wt[i - 1]) + bt[i] - at[i]
        wt[i] = tat[i] - bt[i]
        #Here we either print or save the elements somewhere
        print(N[i] , "\t\t" , at[i] , "\t\t" , bt[i] , "\t\t" , wt[i], "\t\t", tat[i])


    average = 0.0
    sum = 0

    for i in range(n):
        sum = sum + wt[i]

    
    average = sum / n
    print("Average waiting time is ", average)

    for i in range(n):
        sum = sum + tat[i]

    average = sum / n
    print("Average TAT time is ", average)


N = [1, 2, 3, 4]

at = [0, 7, 2, 1]

bt = [7, 1, 2, 1]

schedulingAlgorithem(at, bt, N)