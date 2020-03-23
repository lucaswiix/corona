Thor
====
### TECH STACK

[NodeJS@8 LTS](https://nodejs.org/en/download/)

[Docker](https://docs.docker.com/install)

[GCloud](https://cloud.google.com/sdk/downloads?hl=pt-br)

[GSUtil](https://cloud.google.com/storage/docs/gsutil_install)

[AWS CLI](https://docs.aws.amazon.com/pt_br/cli/latest/userguide/installing.html)

#### EXTERNAL SERVICES

[Cloudflare](https://www.cloudflare.com/pt-br/)

[ClickSign](https://www.clicksign.com/)

[Twilio](https://www.twilio.com/)

[Bepay](https://www.bepay.com/)

[Sentry](https://sentry.io/welcome/)

#### POSTGRES

Create a postgres docker container for local development

From project root path execute

```
$ ./postgres/run.sh local
```

```
$ ./postgres/run.sh test
```

### PATTERNS

Project Pattern to follow 
https://github.com/live-here/docs

### TEST
```
$ yarn test
```

### SDK REGISTRY
```
# Login to Live Here private NPM registry  
$ npm login --registry=https://verdaccio.livehere.com.br

# Configure registry name
$ echo '@livehere:registry=https://verdaccio.livehere.com.br' > ~/.npmrc 

# Publish new npm packages version, need to update the version in sdk/package.json file
$ yarn publish:sdk
``` 

### MIGRATIONS
Database migration tool used: [SQL Migrate](https://github.com/rubenv/sql-migrate)
```
$ yarn sql-migrate --help
usage: sql-migrate [--version] [--help] <command> [<args>]

Available commands are:
    down      Undo a database migration
    new       Create a new migration
    redo      Reapply the last migration
    status    Show migration status
    up        Migrates the database to the most recent version available
```

```
Options:

  -config=config.yml   Configuration file to use.
  -env="development"   Environment.
  -limit=0             Limit the number of migrations (0 = unlimited).
  -dryrun              Don't apply migrations, just print them.
```

### GOOGLE CLOUD

```
gcloud config set project livehere-project-185911
```
