
# Install dependiences

``` bash
npm i
```

# run tests

``` bash
npm test
```


# Build Docker 

``` bash
docker build -t demoqa-tests .
```

# Build and push docker image


### USE:
```bash
  buildDocker.sh [-r <registry>] [-t <tag>] [-p] IMAGE_NAME
```
or in Windows
```cmd
  buildDocker.bat [-r <registry>] [-t <tag>] [-p] IMAGE_NAME
```

#### Option:
```bash
  -r <registry>  opcjonal prefix registry, ex. "ghcr.io/org" .
                 If not specified, the image is built locally without a registry prefix.
  -t <tag>       Tag image (default: latest).
  -p             Performs a 'docker push' after building.
```
Arguments:
```bash
  IMAGE_NAME     Image name (without tag and registry), ex. "demoqa-tests".
```
# Run docker tests

```bash
docker run --rm demoqa-tests  
```
