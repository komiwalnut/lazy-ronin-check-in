# Lazy Ronin CheckIn 🔥
An automated blockchain transaction sender that calls the `checkIn(address)` function on a smart contract daily at 1 UTC because I'm too lazy and don't want to lose my streak (it probably matters).

## Security Features

- **Strong Encryption**: AES-256-GCM with random salt, IV, and authentication tag
- **Secure Storage**: Private key never stored in plain text
- **File Permissions**: Encrypted key file has restricted permissions
- **Password Masking**: Private key input is hidden during entry
- **Gas Optimization**: Smart gas limit capping to prevent overpayment

## Setup

1. Clone this repository and navigate to its directory:
   ```
   git clone https://github.com/komiwalnut/lazy-ronin-check-in.git
   cd lazy-ronin-check-in
   ```

2. Install dependencies:
   ```
   pnpm install
   ```

3. Create a `.env` file based on the example:
   ```
   cp .env.example .env
   ```

4. Edit the `.env` file with your settings:
   - Generate a secure encryption key with:
     ```
     node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
     ```
   - Set your dRPC endpoint (follow instruction in `.env` file you just created)

## Usage

### Testing

To test the script:

1. Make sure Node.js and pnpm are installed
2. Run in test mode to verify everything works without sending transactions:
   ```
   pnpm run test
   ```

### Running Manually

```
pnpm run dev
```

On first run, you'll be prompted to enter your private key, which will be encrypted and stored securely.

### Production Deployment

Build and run:

```
pnpm build
pnpm start
```

### Setting Up a Cron Job

To run the script automatically at 01:00 UTC every day:

1. Find your project's absolute path:
   ```
   pwd
   ```
   This will display something like `/home/ec2-user/lazy-ronin-check-in`

2. Find the absolute path to your pnpm executable:
   ```
   which pnpm
   ```
   This will display something like `/usr/local/bin/pnpm`

3. Open the crontab editor:
   ```
   crontab -e
   ```

4. Add the following line (replace with your actual paths):
   ```
   0 1 * * * cd /path/to/lazy-ronin-check-in && /path/to/pnpm start >> /path/to/lazy-ronin-check-in/cron.log 2>&1
   ```
   Example:
   ```
   0 1 * * * cd /home/ec2-user/lazy-ronin-check-in && /usr/local/bin/pnpm start >> /home/ec2-user/lazy-ronin-check-in/cron.log 2>&1
   ```
   This will run the script at exactly 01:00 UTC every day.

5. Save and exit the editor:
   - For nano: Press Ctrl+O, then Enter, then Ctrl+X
   - For vim: Press Esc, then type `:wq` and hit Enter

6. Verify your cron job was added:
   ```
   crontab -l
   ```

This will run the script at exactly 01:00 UTC every day and save all output to `cron.log` in your project directory.