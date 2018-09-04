# What's this?

This is GAE, Python3.7, Webpack, Docker boilerplate

# Homepage

<a href='https://mercurial-feat-215211.appspot.com/' target='_blank'>
  https://mercurial-feat-215211.appspot.com/
</a>

# TODO

```
$ bin/init
```


# Deploy

Before you deploy, please confirm 2 steps.

1. environment variables

set the below environment variables in your .bash_profile.

```
export SERVICE_ACCOUNT=deployer@<PROJECT_ID>.iam.gserviceaccount.com
export SERVICE_ACCOUNT_KEY=cert/deployer.json
export PROJECT_ID=mercurial-feat-xxxxxx
export SECRET_KEY=xxxxxxxxxxxxxxxx
```

2. create your app

```
gcloud app create --project PROJECT_ID
```

```
$ bin/deploy
```
