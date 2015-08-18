class AddBithdayToZombie < ActiveRecord::Migration
  def self.up
    add_column :zombies, :birthday, :date 
  end

  def self.down
    remove_column :zombies, :birthday
  end
end
