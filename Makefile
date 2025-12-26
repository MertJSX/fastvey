start:
	go run main.go
build:
	cd web && npm run build
	CGO_ENABLED=1 GOOS=linux GOARCH=amd64 go build -o ./debug/folderhost main.go
	CC=x86_64-w64-mingw32-gcc CGO_ENABLED=1 GOOS=windows GOARCH=amd64 go build -o ./debug/folderhost.exe main.go
setup:
	@echo "Downloading dependencies..."
	go mod tidy
	go mod download
	cd client && npm install

	@echo "Dependencies are downloaded successfully."