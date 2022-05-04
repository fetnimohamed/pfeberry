import bcrypt from 'bcryptjs';

const data = {
  taskStates:[
    {
       name: 'b',
       description: 'stat01',
       deleted:false,

    }
  ],
  weeks:[
     {name: 'week01',
      startDate:'01/01/2022' ,
      endDate: '07/01/2022',
      description: 'hello',
      deleted: false,
    },
  ],
  users: [
    {
      firstName: 'marwa',
      lastName:'guerfel',
      email: 'superadmin@example.com',
      password: bcrypt.hashSync('1234', 8),
      isSuperAdmin:true,
      isAdmin:false,
      isDispatcher:false,

    },
    {
      firstName: 'eya',
      lastName:'fetni',
      email: 'admin@example.com',
      password: bcrypt.hashSync('1234', 8),
      isSuperAdmin:false,
      isAdmin:true,
      isDispatcher:false,
    },
       {
      firstName: 'eya',
      lastName:'fetni',
      email: 'user@example.com',
      password: bcrypt.hashSync('1234', 8),
      isSuperAdmin:false,
      isAdmin:false,
      isDispatcher:true,
    },
  ],
    taskTheme: [
      {
        name: 'check activity',
        description: 'check activity desc',
        deleted:false,
      },
      {
         name: 'routine activity',
        description: 'routine activity desc',
        deleted:false,
      },
      {
        name: 'training',
        description: 'training desc',
        deleted:false,
      },
    ],
    taskModel: [
      {
        name: 'check model',
        description: 'check activity desc',
        deleted:false,
      },
      {
         name: 'routine model',
        description: 'routine activity desc',
        deleted:false,
      },
      {
        name: 'training model',
        description: 'training desc',
        deleted:false,
      },
    ],
  };
  export default data;