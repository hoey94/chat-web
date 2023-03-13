# jdk

```shell
yum search java|grep jdk
yum install -y java-1.8.0-openjdk.x86_64
java --version

set CATALINA_OPTS=-Xms64m -Xmx512m
```

# 启动任务

sh start.sh

# 部署调度

50 * * * * /data/chat/archive_logs/archive.sh

