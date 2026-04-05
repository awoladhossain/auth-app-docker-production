# GitHub Actions Workflow - Docker Build and Push

## Overview

This workflow automatically builds and pushes Docker images for both the backend and frontend applications to Docker Hub. It runs on every push to the `main` branch and on pull requests, but only pushes images to Docker Hub when code is pushed directly to `main` (not on PRs).

---

## Workflow Triggers

The workflow is triggered by two events:

```yaml
on:
  push:
    branches: [main]      # Triggered on every push to main branch
  pull_request:
    branches: [main]      # Triggered on every PR to main branch
```

### When does it run?
- ✅ **On every push to `main` branch** - Builds AND pushes images to Docker Hub
- ✅ **On every pull request to `main` branch** - Builds images for testing (no push to Docker Hub)

---

## Jobs

### 1. **build-backend** Job

Builds and pushes the backend Docker image to Docker Hub.

#### Steps:

**Step 1: Checkout Code**
```yaml
- name: Checkout code
  uses: actions/checkout@v4
```
- Downloads your repository code into the GitHub Actions runner
- Makes all your source files available for building

**Step 2: Login to Docker Hub** (Only on main branch push)
```yaml
- name: Login to Docker Hub
  if: github.event_name == 'push'
  uses: docker/login-action@v3
  with:
    username: ${{ secrets.DOCKERHUB_USERNAME }}
    password: ${{ secrets.DOCKERHUB_TOKEN }}
```
- Authenticates with Docker Hub using your credentials
- `if: github.event_name == 'push'` - Only runs when pushing to main, NOT on pull requests
- Uses GitHub Secrets to securely store credentials (never hardcoded)
- Secrets needed:
  - `DOCKERHUB_USERNAME` - Your Docker Hub username
  - `DOCKERHUB_TOKEN` - Your Docker Hub access token

**Step 3: Build and Push Backend Image**
```yaml
- name: Build and push backend
  uses: docker/build-push-action@v5
  with:
    context: ./backend           # Build from backend folder
    dockerfile: ./backend/Dockerfile  # Use Dockerfile in backend
    push: ${{ github.event_name == 'push' }}  # Push only on main branch
    tags: |
      ${{ secrets.DOCKERHUB_USERNAME }}/auth-backend:latest
      ${{ secrets.DOCKERHUB_USERNAME }}/auth-backend:${{ github.sha }}
```

**What it does:**
- Builds Docker image from `./backend` directory
- Tags the image with:
  - `{username}/auth-backend:latest` - Latest version tag
  - `{username}/auth-backend:{git-commit-sha}` - Specific commit version tag
- `push: ${{ github.event_name == 'push' }}`:
  - `true` when code is pushed to main → Image is pushed to Docker Hub
  - `false` on pull requests → Image is only built, not pushed

**Example Tags:**
- `john-doe/auth-backend:latest`
- `john-doe/auth-backend:a3f4d8c1e2b9f7a5d6c8e9b2f3a5d7e9`

---

### 2. **build-frontend** Job

Identical to `build-backend` but for the frontend application.

```yaml
build-frontend:
  runs-on: ubuntu-latest

  steps:
    # Same structure as backend job
    - name: Checkout code
    - name: Login to Docker Hub
      if: github.event_name == 'push'
    - name: Build and push frontend
      # Builds from ./frontend/Dockerfile
      # Tags: {username}/auth-frontend:latest and :${{ github.sha }}
```

**Key Differences:**
- Context: `./frontend`
- Dockerfile: `./frontend/Dockerfile`
- Image name: `auth-frontend` (instead of `auth-backend`)

---

## How It Works - Step by Step

### Scenario 1: Push to Main Branch
```
Developer pushes code to main branch
           ↓
Workflow Triggered (push event)
           ↓
build-backend job:
  • Checkout code ✓
  • Login to Docker Hub ✓ (if condition met)
  • Build & Push image ✓
           ↓
build-frontend job:
  • Checkout code ✓
  • Login to Docker Hub ✓ (if condition met)
  • Build & Push image ✓
           ↓
Both images now available on Docker Hub with:
  - Latest tag (always points to newest)
  - Commit SHA tag (specific snapshot)
```

### Scenario 2: Create Pull Request
```
Developer creates PR to main branch
           ↓
Workflow Triggered (pull_request event)
           ↓
build-backend job:
  • Checkout code ✓
  • Login to Docker Hub ✗ (skipped - if condition NOT met)
  • Build image ✓ (but NO push)
           ↓
build-frontend job:
  • Checkout code ✓
  • Login to Docker Hub ✗ (skipped - if condition NOT met)
  • Build image ✓ (but NO push)
           ↓
Workflow completes
Images are built successfully ✓
Images are NOT pushed to Docker Hub (deliberate)
```

---

## Required Setup

### 1. GitHub Secrets Configuration

You must add these secrets to your GitHub repository:

**Steps to add secrets:**
1. Go to your repository on GitHub
2. Settings → Secrets and variables → Actions
3. Add new repository secret:
   - **Name:** `DOCKERHUB_USERNAME`
   - **Value:** Your Docker Hub username

4. Add another secret:
   - **Name:** `DOCKERHUB_TOKEN`
   - **Value:** Your Docker Hub access token

**How to get Docker Hub Token:**
1. Go to [Docker Hub](https://hub.docker.com/)
2. Login to your account
3. Account Settings → Security → New Access Token
4. Generate and copy the token

### 2. Dockerfile Requirements

Make sure you have:
- ✅ `./backend/Dockerfile` - For building backend image
- ✅ `./frontend/Dockerfile` - For building frontend image

---

## Conditional Logic Explanation

### `if: github.event_name == 'push'`

This condition applies to both login and push steps:

```
github.event_name value:
  • 'push' → PR = false, auth step runs ✓
  • 'pull_request' → PR = true, auth step skipped ✗
```

### `push: ${{ github.event_name == 'push' }}`

This is a dynamic boolean:

```
If github.event_name == 'push':
  push: true  → Docker image is pushed to Docker Hub

If github.event_name == 'pull_request':
  push: false → Docker image is NOT pushed (only built for testing)
```

---

## Benefits of This Workflow

| Feature | Benefit |
|---------|---------|
| **Automated Builds** | No manual Docker builds needed |
| **Selective Pushing** | Only main branch publishes to Docker Hub (no accidental PR pushes) |
| **Versioning** | Both `latest` and commit-specific tags for rollback capability |
| **CI/CD Pipeline** | Ensures code builds successfully before merge |
| **Parallel Jobs** | Backend and frontend build simultaneously (faster) |
| **Secure Credentials** | Docker Hub token never exposed in logs |

---

## Docker Hub Image Repository

After successful workflow execution, your images will be available at:

### Backend Image
```
docker pull {DOCKERHUB_USERNAME}/auth-backend:latest
docker pull {DOCKERHUB_USERNAME}/auth-backend:{commit-sha}
```

### Frontend Image
```
docker pull {DOCKERHUB_USERNAME}/auth-frontend:latest
docker pull {DOCKERHUB_USERNAME}/auth-frontend:{commit-sha}
```

---

## Troubleshooting

### Issue: "Docker Hub login failed"
- ✓ Check if `DOCKERHUB_USERNAME` secret is set correctly
- ✓ Check if `DOCKERHUB_TOKEN` secret is set correctly and not expired
- ✓ Verify token has push permissions

### Issue: "Build fails"
- ✓ Check if Dockerfile exists in specified path
- ✓ Verify dependencies in `package.json` are correct
- ✓ Check GitHub Actions logs for detailed error messages

### Issue: "Images not pushed to Docker Hub"
- ✓ Check if push was to main branch (not PR)
- ✓ Verify workflow status is "success" (not "failure")
- ✓ Check Docker Hub repository settings for access

---

## Summary

This workflow provides a **production-ready CI/CD pipeline** that:
- ✅ Builds Docker images for both applications
- ✅ Tests builds on every PR (without pushing)
- ✅ Automatically publishes to Docker Hub on main branch
- ✅ Uses semantic versioning (latest + commit SHA)
- ✅ Maintains security with GitHub Secrets
