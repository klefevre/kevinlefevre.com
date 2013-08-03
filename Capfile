load 'config/deploy'

desc "FTP Sync && Mount"
namespace :deploy do

  desc "Sync remote by default"
  task :default do
    remote.default
  end

  namespace :remote do
      desc "Mount remote to local #{application}"
      task :mount do
          `mkdir ./mnt/#{application} -p`
          `curlftpfs ftp://#{login}:#{password}@#{url} ./mnt/#{application}`
      end

      desc "Unmount #{application}"
      task :umount do
          `fusermount -u ./mnt/#{application}`
      end

      desc "Sync to remote server using lftp"
      task :sync do
          `lftp -c "set ftp:list-options -a; open ftp://#{login}:#{password}@#{ftp_host}; lcd #{app_path}; cd #{deploy_to}; mirror --reverse --delete --use-cache --verbose --allow-chown --allow-suid --no-umask --parallel=2 --exclude-glob .git --exclude-glob *.log"`

      end

      desc "Sync app to remote server"
      task :default do
          self.sync
      end
  end

end