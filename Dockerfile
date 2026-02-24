# --- Base image from Microsoft Playwright with browsers already installed ---
FROM mcr.microsoft.com/playwright:v1.58.2-jammy

# Set working directory
WORKDIR /app

# Copy only package.json for better layer caching
COPY package*.json ./

# Install Node dependencies (devDependencies included)
RUN npm ci

# Copy the rest of the project
COPY . .

# Ensure Allure commandline is available globally (npm local is enough, but we expose path)
ENV PATH=/app/node_modules/allure-commandline/bin:$PATH

# Default command: run Playwright tests
CMD ["npm", "test"]