# File Manager

RS School Node.js Course

## Run

### CMD / Bash

```bash
npm run start -- --username=your_name
```

### PowerShell

```powershell
npm run start '--' '--username=your_name'
```

### Direct Node.js

```powershell
node ./src/main.js -- --username=your_name
```

**Note:** If you don't specify `--username`, the application will use "Anonymous" as the default username.

## Description

Simple CLI File Manager using Node.js 24+ (no external dependencies).
Implements file navigation, operations, hashing, compression, etc.

## Commands

### Navigation & Working Directory

- `up` - Go upper from current directory
- `cd path_to_directory` - Go to dedicated folder (relative or absolute path)
- `ls` - List all files and folders in current directory

### Basic File Operations

- `cat path_to_file` - Read file and print its content
- `add new_file_name` - Create empty file in current working directory
- `mkdir new_directory_name` - Create new directory in current working directory
- `rn path_to_file new_filename` - Rename file
- `cp path_to_file path_to_new_directory` - Copy file
- `mv path_to_file path_to_new_directory` - Move file
- `rm path_to_file` - Delete file

### Operating System Info

- `os --EOL` - Get default system End-Of-Line
- `os --cpus` - Get host machine CPUs info
- `os --homedir` - Get home directory
- `os --username` - Get current system user name
- `os --architecture` - Get CPU architecture

### Hash Calculation

- `hash path_to_file` - Calculate hash for file

### Compression Operations

- `compress path_to_file path_to_destination` - Compress file using Brotli algorithm
- `decompress path_to_file path_to_destination` - Decompress file using Brotli algorithm

### Examples

```bash
# Navigation
> up
> cd Documents
> cd ../Downloads
> cd C:\Users\Username\Desktop
> ls

# File operations
> add test.txt
> cat test.txt
> mkdir myfolder
> rn test.txt newname.txt
> cp newname.txt myfolder
> mv newname.txt myfolder
> rm myfolder/newname.txt

# System info
> os --EOL
> os --cpus
> os --homedir
> os --username
> os --architecture

# Hash and compression
> hash test.txt
> compress test.txt .
> decompress test.txt.br .
```

### Exit

- `.exit` - Exit the application
- `Ctrl+C` - Exit the application
