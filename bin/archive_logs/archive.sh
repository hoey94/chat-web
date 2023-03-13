#!/bin/bash

current_date=$(date +"%Y-%m-%d_%H:00:00.000")

line_count=$(cat /data/chat/output.log  | grep 发送请求 | awk -F' ' -v default_date="$(date +"%Y-%m-%d %H:00:00.000")"  '{
	date_str = $1 " " $2
	cmd1="date -d\"" date_str "\" +%s"
	cmd2="date -d\"" default_date "\" +%s"
	cmd1 | getline time_stamp1
	close(cmd1)
	cmd2 | getline time_stamp2
	close(cmd2)
	if (time_stamp1 > time_stamp2) {
		print $0
	}
}' | wc -l)


if [ $line_count -ne 0 ]
then
    cat /data/chat/output.log  | grep 发送请求 | awk -F' ' -v default_date="$(date +"%Y-%m-%d %H:00:00.000")"  '{
		date_str = $1 " " $2
		cmd1="date -d\"" date_str "\" +%s"
		cmd2="date -d\"" default_date "\" +%s"
		cmd1 | getline time_stamp1
		close(cmd1)
		cmd2 | getline time_stamp2
		close(cmd2)
		if (time_stamp1 > time_stamp2) {
			print $0
		}
	}' > /data/chat/archive_logs/${current_date}.txt
else
    echo "什么都不做"
fi