# Listare
Listare is a personal tasks management web application, developed in order to help workers with their appointments.
It has a system based in lists and every lists has multiple tasks, where you can edit, conclude and delete them.
In it's main features we have:
1. Shares : The main part that allows the user to work with team of people. You can share your list with your freinds.
2. Advanced Search : You can search your lists based on the name, tags, priority and even the if they're shared or not.
3. Achievements : Based in how many lists you have finished it gives you user achivements.

## Used Technologies 
The ued technologies are:
1. React , V: 19.0.0
2. NextJs , V: 15.1.4
3. PostgresSql, V: 17
4. Prisma ORM, V: 6.2.1
5. TypeScript, V: 5
6. Next Auth, V: 4.24.11
7. Bootstrap and react Bootstrap, V: 5.3.3 , V: 2.10.7

### Installing the project
In order to install the project in your machine you need to firstly clone the repostitory using the command: 
> git clone https://github.com/Masullo404/Listare

After it, you change your directory to the main project's folder with the command: 
>cd ./listare

So, once in the right directory you install all the dependencies typing:
>npm install

Therefore, you need to set up your database installing the postgres, and them running the command 
> npx prisma init

Then create the `.env` in the root of your application, in this file you're going to set up the database connection with the application name and your password, to see detailed information about it see in the prisma docs: https://www.prisma.io/docs/accelerate/getting-started 

After having the database ready, now you should set up all the enviroment variables, first create the `.env.local` file in the root directory of your project:
- NEXTAUTH_SECRET: this is your secret key for next Auth, create it using the command `openssl rand -base64 32` in your GIT BASH terminal.
- NEXTAUTH_URL: in order to run the project locally the defaul is goingo to be `http://localhost:3000`
- JWT_SECRET: your secret JSON WEB TOKEN key, for this one you can also use the same command as the NEXTAUTH_SECRET

Finally, to make the oauth works, you must configure the GOOGLE keys and GITHUB KEYS. 
### Generating Google and GitHub API Keys

#### Google API Keys

1. **Access Google Cloud Console**:

   - Visit [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project if you don’t already have one.

2. **Create Credentials**:

   - Go to **APIs & Services > Credentials**.
   - Click **Create Credentials** and select **OAuth Client ID**.
   - Configure the redirect URIs and save.

3. **Set Environment Variables**:

   - Save the keys the `.env.local` file:
     ```env.local
     GOOGLE_ID=<your-client-id>
     GOOGLE_SECRET=<your-client-secret>
     ```

#### GitHub API Keys

1. **Access GitHub Developer Settings**:

   - Go to your [GitHub Developer Settings](https://github.com/settings/developers).

2. **Create a New OAuth App**:

   - Under **OAuth Apps**, click **New OAuth App**.
   - Fill in the required details:
     - **Application Name**: Name of your app.
     - **Homepage URL**: Your app’s homepage.
     - **Authorization Callback URL**: The URL to redirect users after authorization.

3. **Generate Client ID and Secret**:

   - After creating the app, GitHub will provide a **Client ID** and **Client Secret**.

4. **Set Environment Variables**:

   - Save the keys in a `.env.local` file:
     ```env.local
     GITHUB_ID=<your-client-id>
     GITHUB_SECRET=<your-client-secret>
     ```

- Refer to [Google Cloud Documentation](https://cloud.google.com/docs) and [GitHub Documentation](https://docs.github.com) for detailed instructions or troubleshooting.
