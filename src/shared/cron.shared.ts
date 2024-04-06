import cron from 'node-cron'

const cronExpression = '* * * * * *';

function action(){
    console.log('This cron job will run every second')
}

const job = cron.schedule(cronExpression, action, {scheduled:false})

job.start()