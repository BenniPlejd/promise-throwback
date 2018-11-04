"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jasmine_spec_reporter_1 = require("jasmine-spec-reporter");
jasmine.DEFAULT_TIMEOUT_INTERVAL = parseInt(process.env.JASMINE_TIMEOUT_INTERVAL, 10) || 5000;
jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new jasmine_spec_reporter_1.SpecReporter({
    spec: {
        displayPending: true,
    },
}));
//# sourceMappingURL=reporterHelper.js.map