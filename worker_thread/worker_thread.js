const{Worker,isMainThread,parentPort, workerData}=require('worker_threads');

if(isMainThread){//main thread
    const threads=new Set();
    threads.add(new Worker(__filename,{
        workerData:{start:1},
    }));
    threads.add(new Worker(__filename,{
        workerData:{start:2},
    }));
    
    for(let worker of threads){
        worker.on('message',(value)=>console.log('from worker',value));
        worker.on('exit',()=>{
            threads.delete(worker);
            if(threads.size ===0){
                console.log("end worker");
            }
        });      
    }   
    worker.postMessage('ping');
}else{//worker thread
    const data=workerData;
    parentPort.postMessage(data.start+100);

    parentPort.on('message',(value)=>{ 
        console.log('from parent',value);
        parentPort.postMessage('pong');//main에 pong보냄냄
        parentPort.close();//할일 다 해서 종료
    })
}

if(isMainThread){
    const max=10_000_000;
    const threadCount=8;
    const threads=new Set();
    const range=Math.ceil((max-min)/threadCount);
    let start=min;
    console.time('prime');
    
    for(let i=0;i<threadCount-1;i++){
        const wStart=start;
        threads.add(new worker(__fileName,{workerData:{start:wStart,range}}));
    }

    threads.add(new Worker(__filename,{workerData:{start,range:range+((max-min+1))}}));
}