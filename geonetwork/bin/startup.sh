#!/usr/bin/env bash

export JETTY_HOME=../jetty
export JETTY_FOREGROUND=0
export JETTY_BASE=$JETTY_HOME
cd $JETTY_HOME
CURRENT_DIR=`pwd`
echo "Working dir is $CURRENT_DIR"

for i in "$@"
do
case $i in
    -f*)
    JETTY_FOREGROUND=1
    shift
    ;;
    *)
    ;;
esac
done

echo "Archiving old log files..."
if [ ! -d "logs/archive" ]; then
    mkdir -p logs/archive
fi
rm -f logs/*request.log*
rm -f logs/output.log
find logs -maxdepth 1 -name 'geonetwork.log.*' -type f -exec mv -t logs/archive/ '{}' +

# Set custom data directory location using system property
#export geonetwork_dir=/app/geonetwork_data_dir

export JAVA_MEM_OPTS="-Xms512m -Xmx1g"

export JAVA_OPTS="$JAVA_MEM_OPTS --add-opens=jdk.management/com.sun.management.internal=ALL-UNNAMED -Djetty.httpConfig.requestHeaderSize=32768 -Dorg.eclipse.jetty.server.Request.maxFormContentSize=500000 -Dorg.eclipse.jetty.server.Request.maxFormKeys=4000 -Xss2M -Djeeves.filecharsetdetectandconvert=enabled -Dmime-mappings=../web/geonetwork/WEB-INF/mime-types.properties -DSTOP.PORT=8079 -Djava.awt.headless=true -DSTOP.KEY=geonetwork -Djetty.port=80"

# Set custom data directory location using Java property
# export JAVA_OPTS="$JAVA_OPTS -Dgeonetwork.dir=/app/geonetwork_data_dir"

export JETTY_CMD="$JAVA_OPTS -jar $JETTY_HOME/start.jar"
echo "Starting Jetty..."
if [ $JETTY_FOREGROUND = 1 ]; then
    java $JETTY_CMD
else
    java $JETTY_CMD > logs/output.log 2>&1 &
fi
