// Engineering: jWilliamDunn 2019

class PriorityQueue {
  constructor() {
    this.items = [];
  }

  push(data, priority) {
    var qElement = {data, priority}, f=Math.floor, qued = false;
    // binary search to insert
    if (this.items.length>2)
      for(var l=0,r=this.items.length-1,m=f(r/2);l<=r;){
        if(m==0 || (this.items[m].priority > qElement.priority
           && this.items[m-1].priority <= qElement.priority)) {
          this.items.splice(m,0,qElement);
          qued = true;
          break;
        }
        qElement.priority<this.items[m].priority?r=m-1:l=m+1;
        m=f((l+r)/2);
      }
    else for (var i=0;i<this.items.length;i++)
      if (this.items[i].priority > qElement.priority) {
        this.items.splice(i,0,qElement);
        qued = true;
        break;
      }
    if (!qued) this.items.push(qElement); // or add to the end
  }

  pop() {
    return this.items.length>0? this.items.shift().data : null;
  }
}

var pq = new PriorityQueue();

pq.push("Clear drains", 3);
pq.push("Feed cat", 4);
pq.push("Make tea", 5);
pq.push("Solve RC tasks", 1);
pq.push("Tax return", 2);
console.log(pq.pop()); // Solve RC tasks
pq.push("Empty trash", 6);
console.log(pq.items);

// average 8.95 operations to insert element in n=1000 which is approx O(log2(n))
