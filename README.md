This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Setup and Running Instructions

Follow these steps to get the project set up and running on your local machine.

### 1. Clone the Repository

If you haven't already, clone the project repository to your local machine:

```bash
git clone https://github.com/iam-joey/api-payram-integration.git
cd api-payram-integration
```

### 2. Set Up Environment Variables

This project uses environment variables for configuration. A sample file named `.env.example` is provided in the root directory. It contains the following variables:

```
PAYRAM_API_URL="http://localhost:8080/api/v1/payment"
API_KEY=""
```

1.  Create a copy of `.env.example` and name it `.env`:
    ```bash
    cp .env.example .env
    ```
2.  Open the `.env` file and fill in the required values for `PAYRAM_API_URL` (if different from the default) and `API_KEY`. The `API_KEY` is essential for the application to communicate with the Payram API.

### 3. Install Dependencies

This project uses npm (Node Package Manager). Install the project dependencies by running:

```bash
npm install
```

This command will install all the necessary packages defined in `package.json`.

### 4. Run the Development Server

Once the dependencies are installed and environment variables are set, you can start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
