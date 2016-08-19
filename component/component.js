/* v----- Do not change anything between here
 *       (the DRIVERNAME placeholder will be automatically replaced during build) */
define('ui/components/machine/driver-%%DRIVERNAME%%/component', ['exports', 'ember', 'ui/mixins/driver'], function (exports, _ember, _uiMixinsDriver) {

  exports['default'] = _ember['default'].Component.extend(_uiMixinsDriver['default'], {
    driverName: '%%DRIVERNAME%%',
    /* ^--- And here */
    model: null,
    config: Ember.computed.alias('model.%%DRIVERNAME%%Config'),

    // Write your component here, starting with setting 'model' to a machine with your config populated
    bootstrap: function () {
      let config = this.get('store').createRecord({
        type: '%%DRIVERNAME%%Config',
        region: "cn-shanghai",
        upgradeKernel: true,
      });

      this.set('model', this.get('store').createRecord({
        type: 'machine',
        '%%DRIVERNAME%%Config': config,
        'engineRegistryMirror': ["https://9hhtm9h4.mirror.aliyuncs.com"],
      }));
    },

    // Add custom validation beyond what can be done from the config API schema
    validate: function () {
      let errors = [];

      if (!this.get('config.accessKeyId')) {
        errors.push('Access Key is required');
      }

      if (!this.get('config.accessKeySecret')) {
        errors.push('Access Key Secret is requried');
      }

      if (!this.get('config.ipAddress')) {
        errors.push('IP Address is required');
      }

      if (!this.get('config.sshPassword')) {
        errors.push('Password is required to access the machine');
      }

      if (errors.length) {
        this.set('errors', errors.uniq());
        return false;
      }

      return true;
    },

  });
});
