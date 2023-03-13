#!/bin/bash

key=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
ps -ef | grep chat-0.0.1 | grep -v grep  | awk -F' ' '{print $2}' | xargs kill -9
nohup java -jar /data/chat/chat-0.0.1-SNAPSHOT.jar --server.port=80 > output.log 2>&1 &
#nohup java -jar /data/chat/chat-0.0.1-SNAPSHOT.jar --server.port=80 --chat.key=$key > output.log 2>&1 &