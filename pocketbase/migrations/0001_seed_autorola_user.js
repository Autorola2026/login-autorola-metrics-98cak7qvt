migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    // Idempotente: verificar se o usuário já existe
    try {
      app.findAuthRecordByEmail('_pb_users_auth_', 'mcb@autorola.com.br')
      return // Usuário já existe
    } catch (_) {}

    const record = new Record(users)
    record.setEmail('mcb@autorola.com.br')
    record.setPassword('Skip@Pass')
    record.setVerified(true)
    record.set('name', 'Marcelo CB')
    app.save(record)
  },
  (app) => {
    try {
      const record = app.findAuthRecordByEmail('_pb_users_auth_', 'mcb@autorola.com.br')
      app.delete(record)
    } catch (_) {}
  },
)
