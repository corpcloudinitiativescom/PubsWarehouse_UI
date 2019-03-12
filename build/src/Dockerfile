FROM registry.gitlab.com/usgs-csasl-hub/nodejs:8.12-latest

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY /src /app

# Build app with make
RUN make

# Run server when the container launches
CMD ./server/env/bin/python ./server/run.py --host 0.0.0.0
