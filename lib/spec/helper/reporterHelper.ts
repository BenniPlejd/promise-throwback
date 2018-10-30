import { SpecReporter } from 'jasmine-spec-reporter';

jasmine.DEFAULT_TIMEOUT_INTERVAL = parseInt(process.env.JASMINE_TIMEOUT_INTERVAL, 10) || 5000;
jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new SpecReporter({
    spec: {
        displayPending: true,
    },
}));
