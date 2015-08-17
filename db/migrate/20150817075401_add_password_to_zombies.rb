class AddPasswordToZombies < ActiveRecord::Migration
  def self.up
    add_column :zombies, :password, :string
  end

  def self.down
    remove_column :zombies, :password
  end
end
