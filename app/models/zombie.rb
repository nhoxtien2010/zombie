class Zombie < ActiveRecord::Base
  has_one :brain, :dependent => :destroy
  has_many :tweets
  scope :rooting, where(:rooting => true)
  scope :fresh, where("age < 20")
  scope :recent, order("created_at desc").limit(3)


end
