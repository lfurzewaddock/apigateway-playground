// @ts-check
/// <reference path="./node_modules/express-gateway/index.d.ts" />

/** @type {ExpressGateway.Plugin} */
const plugin = {
  version: '1.0.0',
  policies: ['apiroot'],
  init: function (pluginContext) {
    pluginContext.registerGatewayRoute((app) => {
      app.get('/apiroot', (req, res) => res.json({
        url: '/',
        actions: [
          { url: 'http://customers.apitest.lan/', value: 'listCustomer' },
          { url: 'http://customers.apitest.lan/', value: 'createCustomer' },
          { url: 'http://invoices.apitest.lan/{customerId}/invoices/', value: 'listInvoice' },
          { url: 'http://invoices.apitest.lan/{customerId}/invoices/', value: 'createInvoice' },
        ]
      }));
    });
  }
}

module.exports = plugin;
